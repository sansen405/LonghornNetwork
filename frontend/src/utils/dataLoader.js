// Calculate connection strength between two students
export const calculateConnectionStrength = (student1, student2, roommate1, roommate2) => {
  let strength = 0;
  
  // Same age: +1
  if (student1.age === student2.age) strength += 1;
  
  // Same major: +2
  if (student1.major === student2.major) strength += 2;
  
  // Shared internships: +3 per shared internship
  const internships1 = student1.previousInternships.filter(i => i !== 'None');
  const internships2 = student2.previousInternships.filter(i => i !== 'None');
  internships1.forEach(int => {
    if (internships2.includes(int)) strength += 3;
  });
  
  // Are roommates: +4
  if (roommate1 === student2.name || roommate2 === student1.name) {
    strength += 4;
  }
  
  return strength;
};

// Build graph from students
export const buildGraph = (students, roommates) => {
  const nodes = students.map(s => ({
    id: s.name,
    name: s.name,
    major: s.major,
    gpa: s.gpa
  }));
  
  const edges = [];
  
  for (let i = 0; i < students.length; i++) {
    for (let j = i + 1; j < students.length; j++) {
      const s1 = students[i];
      const s2 = students[j];
      
      // Find roommates
      const r1 = roommates.find(r => r.student1 === s1.name);
      const r2 = roommates.find(r => r.student1 === s2.name);
      
      const roommate1 = r1 ? r1.student2 : null;
      const roommate2 = r2 ? r2.student2 : null;
      
      const weight = calculateConnectionStrength(s1, s2, roommate1, roommate2);
      
      if (weight > 0) {
        edges.push({
          from: s1.name,
          to: s2.name,
          weight: weight
        });
      }
    }
  }
  
  return { nodes, edges };
};

// Gale-Shapley algorithm for roommate matching
export const assignRoommates = (students) => {
  const roommates = [];
  const matched = new Set();
  const studentMap = {};
  
  students.forEach(s => {
    studentMap[s.name] = s;
  });
  
  const queue = students.filter(s => s.roommatePreferences.length > 0);
  const proposals = {};
  
  students.forEach(s => {
    proposals[s.name] = 0;
  });
  
  while (queue.length > 0) {
    const proposer = queue.shift();
    
    if (matched.has(proposer.name)) continue;
    if (proposals[proposer.name] >= proposer.roommatePreferences.length) continue;
    
    const preferredName = proposer.roommatePreferences[proposals[proposer.name]];
    proposals[proposer.name]++;
    
    const preferred = studentMap[preferredName];
    if (!preferred) continue;
    
    // Check if preferred is already matched
    const currentMatch = roommates.find(r => r.student1 === preferred.name || r.student2 === preferred.name);
    
    if (!currentMatch) {
      // Accept proposal
      roommates.push({
        student1: proposer.name,
        student2: preferred.name,
        connectionStrength: calculateConnectionStrength(proposer, preferred, preferred.name, proposer.name)
      });
      matched.add(proposer.name);
      matched.add(preferred.name);
    } else {
      // Check if preferred prefers proposer over current match
      const currentPartner = currentMatch.student1 === preferred.name ? currentMatch.student2 : currentMatch.student1;
      const currentIndex = preferred.roommatePreferences.indexOf(currentPartner);
      const proposerIndex = preferred.roommatePreferences.indexOf(proposer.name);
      
      if (proposerIndex !== -1 && (currentIndex === -1 || proposerIndex < currentIndex)) {
        // Preferred prefers proposer
        const index = roommates.indexOf(currentMatch);
        roommates.splice(index, 1);
        matched.delete(currentPartner);
        
        roommates.push({
          student1: proposer.name,
          student2: preferred.name,
          connectionStrength: calculateConnectionStrength(proposer, preferred, preferred.name, proposer.name)
        });
        matched.add(proposer.name);
        matched.add(preferred.name);
        
        // Add current partner back to queue
        const partner = studentMap[currentPartner];
        if (partner) queue.push(partner);
      } else {
        // Proposal rejected, try next preference
        queue.push(proposer);
      }
    }
  }
  
  return roommates;
};

// Prim's algorithm for pod formation
export const formPods = (students, graph, podSize = 3) => {
  const pods = [];
  const unassigned = new Set(students.map(s => s.name));
  
  while (unassigned.size > 0) {
    const pod = [];
    const inPod = new Set();
    
    // Start with first unassigned student (alphabetically)
    const startName = Array.from(unassigned).sort()[0];
    pod.push(students.find(s => s.name === startName));
    inPod.add(startName);
    unassigned.delete(startName);
    
    // Build pod using Prim's algorithm
    while (pod.length < podSize && unassigned.size > 0) {
      let bestEdge = null;
      let bestWeight = -1;
      
      // Find strongest connection from pod to unassigned student
      for (const member of pod) {
        const edges = graph.edges.filter(e => 
          (e.from === member.name && unassigned.has(e.to)) ||
          (e.to === member.name && unassigned.has(e.from))
        );
        
        for (const edge of edges) {
          if (edge.weight > bestWeight) {
            bestWeight = edge.weight;
            bestEdge = edge;
          }
        }
      }
      
      if (!bestEdge) break;
      
      const nextName = inPod.has(bestEdge.from) ? bestEdge.to : bestEdge.from;
      const nextStudent = students.find(s => s.name === nextName);
      pod.push(nextStudent);
      inPod.add(nextName);
      unassigned.delete(nextName);
    }
    
    pods.push({
      members: pod.map(s => ({ name: s.name, major: s.major })),
      totalWeight: pod.length > 1 ? pod.length * 3 : 0
    });
  }
  
  return pods;
};

// Dijkstra's algorithm for referral path
export const findReferralPath = (students, graph, startName, targetCompany) => {
  const dist = {};
  const prev = {};
  const visited = new Set();
  
  students.forEach(s => {
    dist[s.name] = Infinity;
    prev[s.name] = null;
  });
  
  dist[startName] = 0;
  
  while (visited.size < students.length) {
    // Find unvisited node with minimum distance
    let minDist = Infinity;
    let current = null;
    
    for (const student of students) {
      if (!visited.has(student.name) && dist[student.name] < minDist) {
        minDist = dist[student.name];
        current = student.name;
      }
    }
    
    if (!current || minDist === Infinity) break;
    
    visited.add(current);
    
    // Check if current student has the target company
    const currentStudent = students.find(s => s.name === current);
    const hasTarget = currentStudent.previousInternships.some(
      i => i.toLowerCase() === targetCompany.toLowerCase()
    );
    
    if (hasTarget && current !== startName) {
      // Build path
      const path = [];
      const buildPathNode = (nodeName) => students.find(s => s.name === nodeName);
      
      let currentNode = current;
      while (currentNode) {
        path.unshift(buildPathNode(currentNode));
        currentNode = prev[currentNode];
      }
      return path;
    }
    
    // Update distances to neighbors
    const edges = graph.edges.filter(e => e.from === current || e.to === current);
    
    for (const edge of edges) {
      const neighbor = edge.from === current ? edge.to : edge.from;
      if (visited.has(neighbor)) continue;
      
      // Use inverse of weight (stronger connection = shorter distance)
      const newDist = dist[current] + (1.0 / edge.weight);
      
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        prev[neighbor] = current;
      }
    }
  }
  
  return [];
};

