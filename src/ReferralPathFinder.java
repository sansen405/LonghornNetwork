import java.util.*;

/**
 * FINDS REFERRAL PATHS TO COMPANIES THROUGH STUDENT CONNECTIONS
 */
public class ReferralPathFinder {
    private StudentGraph graph;

    /**
     * CREATES A NEW REFERRAL PATH FINDER
     * @param graph THE STUDENT GRAPH CONTAINING CONNECTIONS
     */
    public ReferralPathFinder(StudentGraph graph) {
        this.graph = graph;
    }

    /**
     * FINDS A PATH FROM A STUDENT TO SOMEONE WITH INTERNSHIP EXPERIENCE AT A COMPANY
     * @param start THE STUDENT TO START SEARCHING FROM
     * @param targetCompany THE COMPANY TO FIND A REFERRAL FOR
     * @return A LIST OF STUDENTS FORMING THE PATH TO THE COMPANY
     */
    public List<UniversityStudent> findReferralPath(UniversityStudent start, String targetCompany) {
        Map<UniversityStudent, Double> dist = new HashMap<>();
        Map<UniversityStudent, UniversityStudent> prev = new HashMap<>();
        Set<UniversityStudent> visited = new HashSet<>();
        
        for (UniversityStudent s : graph.getAllNodes()) {
            dist.put(s, Double.MAX_VALUE);
            prev.put(s, null);
        }
        dist.put(start, 0.0);
        
        PriorityQueue<UniversityStudent> pq = new PriorityQueue<>(Comparator.comparingDouble(dist::get));
        pq.add(start);
        
        while (!pq.isEmpty()) {
            UniversityStudent u = pq.poll();
            if (visited.contains(u)) {
                continue;
            }
            visited.add(u);
            
            for (String internship : u.previousInternships) {
                if (internship.equalsIgnoreCase(targetCompany)) {
                    List<UniversityStudent> path = new ArrayList<>();
                    UniversityStudent cur = u;
                    while (cur != null) {
                        path.add(cur);
                        cur = prev.get(cur);
                    }
                    Collections.reverse(path);
                    return path;
                }
            }
            
            for (StudentGraph.Edge edge : graph.getNeighbors(u)) {
                UniversityStudent v = edge.neighbor;
                if (visited.contains(v)) continue;
                double newDist = dist.get(u) + (1.0 / edge.weight);
                if (newDist < dist.get(v)) {
                    dist.put(v, newDist);
                    prev.put(v, u);
                    pq.add(v);
                }
            }
        }
        
        return new ArrayList<>();
    }
}
