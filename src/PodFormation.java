import java.util.*;

/**
 * FORMS STUDENT PODS BASED ON CONNECTION STRENGTH
 */
public class PodFormation {
    private StudentGraph graph;
    private List<List<UniversityStudent>> pods;

    /**
     * CREATES A NEW POD FORMATION MANAGER
     * @param graph THE STUDENT GRAPH CONTAINING CONNECTIONS
     */
    public PodFormation(StudentGraph graph) {
        this.graph = graph;
        this.pods = new ArrayList<>();
    }

    /**
     * FORMS PODS OF STUDENTS WITH THE SPECIFIED SIZE
     * @param podSize THE NUMBER OF STUDENTS PER POD
     */
    public void formPods(int podSize) {
        pods.clear();
        Set<UniversityStudent> allNodes = graph.getAllNodes();
        Set<UniversityStudent> unassigned = new HashSet<>(allNodes);
        
        while (!unassigned.isEmpty()) {
            UniversityStudent start = findFirstUnassigned(unassigned);
            if (start == null) break;
            
            List<UniversityStudent> pod = buildPodUsingPrims(start, podSize, unassigned);
            pods.add(pod);
        }
        
        printPods();
    }
    
    /**
     * Finds the first unassigned student (alphabetically by name)
     */
    private UniversityStudent findFirstUnassigned(Set<UniversityStudent> unassigned) {
        if (unassigned.isEmpty()) return null;
        return unassigned.stream()
                .min(Comparator.comparing(s -> s.name))
                .orElse(null);
    }
    
    /**
     * Builds a pod using Prim's algorithm, prioritizing stronger connections
     */
    private List<UniversityStudent> buildPodUsingPrims(UniversityStudent start, int podSize, Set<UniversityStudent> unassigned) {
        List<UniversityStudent> pod = new ArrayList<>();
        Set<UniversityStudent> inPod = new HashSet<>();
        
        PriorityQueue<EdgeWithSource> pq = new PriorityQueue<>(
            Comparator.comparingInt((EdgeWithSource e) -> -e.edge.weight)
        );
        
        pod.add(start);
        inPod.add(start);
        unassigned.remove(start);
        
        for (StudentGraph.Edge edge : graph.getNeighbors(start)) {
            if (unassigned.contains(edge.neighbor)) {
                pq.offer(new EdgeWithSource(start, edge));
            }
        }
        
        while (pod.size() < podSize && !pq.isEmpty()) {
            EdgeWithSource current = pq.poll();
            UniversityStudent next = current.edge.neighbor;
            
            if (inPod.contains(next) || !unassigned.contains(next)) {
                continue;
            }
            
            pod.add(next);
            inPod.add(next);
            unassigned.remove(next);
            
            for (StudentGraph.Edge edge : graph.getNeighbors(next)) {
                if (unassigned.contains(edge.neighbor) && !inPod.contains(edge.neighbor)) {
                    pq.offer(new EdgeWithSource(next, edge));
                }
            }
        }
        
        return pod;
    }
    
    /**
     * Helper class to track edge for Prim's algorithm
     */
    private static class EdgeWithSource {
        StudentGraph.Edge edge;
        
        EdgeWithSource(UniversityStudent source, StudentGraph.Edge edge) {
            this.edge = edge;
        }
    }
    
    /**
     * Prints the pod assignments
     */
    private void printPods() {
        System.out.println("\nPod Assignments:");
        for (int i = 0; i < pods.size(); i++) {
            System.out.print("  Pod " + i + ": ");
            for (UniversityStudent student : pods.get(i)) {
                System.out.print(student.name + ", ");
            }
            System.out.println();
        }
    }
    
    /**
     * Gets the list of pods
     * @return THE LIST OF PODS
     */
    public List<List<UniversityStudent>> getPods() {
        return pods;
    }
}
