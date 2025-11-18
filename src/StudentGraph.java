import java.util.*;

/**
 * GRAPH REPRESENTING CONNECTIONS BETWEEN STUDENTS
 */
public class StudentGraph {

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
        }
    }

    /**
     * CREATES A NEW STUDENT GRAPH FROM A LIST OF STUDENTS
     * @param students THE STUDENTS TO BUILD THE GRAPH FROM
     */
    public StudentGraph(List<UniversityStudent> students) {
    }

    /**
     * ADDS AN EDGE BETWEEN TWO STUDENTS WITH A GIVEN WEIGHT
     * @param s1 THE FIRST STUDENT
     * @param s2 THE SECOND STUDENT
     * @param weight THE CONNECTION STRENGTH BETWEEN THEM
     */
    public void addEdge(UniversityStudent s1, UniversityStudent s2, int weight) {
    }

    /**
     * GETS ALL CONNECTIONS FOR A STUDENT
     * @param student THE STUDENT TO GET NEIGHBORS FOR
     * @return A LIST OF EDGES TO NEIGHBORING STUDENTS
     */
    public List<Edge> getNeighbors(UniversityStudent student) {
        return null;
    }

    /**
     * GETS ALL STUDENTS IN THE GRAPH
     * @return A SET OF ALL STUDENTS
     */
    public Set<UniversityStudent> getAllNodes() {
        return null;
    }

    /**
     * DISPLAYS THE GRAPH STRUCTURE TO THE CONSOLE
     */
    public void displayGraph() {
    }
}


