import java.util.*;

/**
 * GRAPH REPRESENTING CONNECTIONS BETWEEN STUDENTS
 */
public class StudentGraph {
    private Map<UniversityStudent, List<Edge>> adjacencyList;

    /**
     * REPRESENTS A CONNECTION BETWEEN TWO STUDENTS
     */
    public static class Edge {
        /**
         * THE STUDENT THIS EDGE CONNECTS TO
         */
        public UniversityStudent neighbor;
        /**
         * THE STRENGTH OF THE CONNECTION
         */
        public int weight;

        /**
         * CREATES A NEW EDGE
         * @param neighbor THE STUDENT THIS EDGE CONNECTS TO
         * @param weight THE CONNECTION STRENGTH
         */
        public Edge(UniversityStudent neighbor, int weight) {
            this.neighbor = neighbor;
            this.weight = weight;
        }

        @Override
        public String toString() {
            return "(" + neighbor.name + ", " + weight + ")";
        }
    }

    /**
     * CREATES A NEW STUDENT GRAPH FROM A LIST OF STUDENTS
     * @param students THE STUDENTS TO BUILD THE GRAPH FROM
     */
    public StudentGraph(List<UniversityStudent> students) {
        adjacencyList = new HashMap<>();
        
        for (UniversityStudent s: students) {
            adjacencyList.put(s, new ArrayList<>());
        }
        
        for (int i = 0; i < students.size(); i++) {
            for (int j = i + 1; j < students.size(); j++) {
                UniversityStudent s1 = students.get(i);
                UniversityStudent s2 = students.get(j);
                int weight = s1.calculateConnectionStrength(s2);
                if (weight > 0) {
                    addEdge(s1, s2, weight);
                }
            }
        }
    }

    /**
     * ADDS AN EDGE BETWEEN TWO STUDENTS WITH A GIVEN WEIGHT
     * @param s1 THE FIRST STUDENT
     * @param s2 THE SECOND STUDENT
     * @param weight THE CONNECTION STRENGTH BETWEEN THEM
     */
    public void addEdge(UniversityStudent s1, UniversityStudent s2, int weight) {
        adjacencyList.get(s1).add(new Edge(s2, weight));
        adjacencyList.get(s2).add(new Edge(s1, weight));
    }

    /**
     * GETS ALL CONNECTIONS FOR A STUDENT
     * @param s THE STUDENT TO GET NEIGHBORS FOR
     * @return A LIST OF EDGES TO NEIGHBORING STUDENTS
     */
    public List<Edge> getNeighbors(UniversityStudent s) {
        return adjacencyList.get(s);
    }

    /**
     * GETS ALL STUDENTS IN THE GRAPH
     * @return A SET OF ALL STUDENTS
     */
    public Set<UniversityStudent> getAllNodes() {
        return adjacencyList.keySet();
    }

    /**
     * DISPLAYS THE GRAPH STRUCTURE TO THE CONSOLE
     */
    public void displayGraph() {
        System.out.println("\nStudent Graph:");
        for (UniversityStudent s : adjacencyList.keySet()) {
            System.out.println(s.name + "->" + adjacencyList.get(s));
        }
    }
}


