import java.util.*;

/**
 * REPRESENTS A UNIVERSITY STUDENT WITH ROOMMATE MATCHING CAPABILITIES
 */
public class UniversityStudent extends Student {
    /**
     * THE STUDENT'S ASSIGNED ROOMMATE
     */
    private UniversityStudent roommate;

    /**
     * CREATES A NEW UNIVERSITY STUDENT
     * @param name THE STUDENT'S NAME
     * @param age THE STUDENT'S AGE
     * @param gender THE STUDENT'S GENDER
     * @param year THE STUDENT'S YEAR IN SCHOOL
     * @param major THE STUDENT'S MAJOR
     * @param gpa THE STUDENT'S GPA
     * @param roommatePreferences LIST OF PREFERRED ROOMMATE NAMES
     * @param previousInternships LIST OF PREVIOUS INTERNSHIP COMPANIES
     */
    public UniversityStudent(String name, int age, String gender, int year, String major, double gpa,
                             List<String> roommatePreferences, List<String> previousInternships) {
        roommate = null;
        
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.year = year;
        this.major = major;
        this.gpa = gpa;
        this.roommatePreferences = roommatePreferences;
        this.previousInternships = previousInternships;
    }

    /**
     * GETS THE STUDENT'S ASSIGNED ROOMMATE
     * @return THE ROOMMATE OR NULL IF NONE ASSIGNED
     */
    public UniversityStudent getRoommate() {
        return roommate;
    }

    /**
     * SETS THE STUDENT'S ROOMMATE
     * @param roommate THE ROOMMATE TO ASSIGN
     */
    public void setRoommate(UniversityStudent roommate) {
        this.roommate = roommate;
    }

    /**
     * CALCULATES CONNECTION STRENGTH WITH ANOTHER STUDENT
     * @param other THE OTHER STUDENT
     * @return THE CONNECTION STRENGTH VALUE
     */
    @Override
    public int calculateConnectionStrength(Student other) {
        UniversityStudent connectedStudent = (UniversityStudent) other;
        int connStrength = 0;

        if (age == connectedStudent.age) {
            connStrength += 1;
        }
        if (major != null) {
            if (major.equals(connectedStudent.major)) {
                connStrength += 2;
            }
        }
        for (int i = 0; i < previousInternships.size(); i++) {
            if (connectedStudent.previousInternships.contains(previousInternships.get(i))) {
                connStrength += 3;
            }
        }
        if (roommate != null){
            if(roommate.equals(connectedStudent)) {
                connStrength += 4;
            }
        }
        return connStrength;
    }
    
    @Override
    public String toString() {
        return "UniversityStudent{name='" + name + "', age=" + age + ", gender='" + gender + "', year=" + year + ", major='" + major + "', GPA=" + gpa + ", roommatePreferences=" + roommatePreferences + ", previousInternships=" + previousInternships + "}";
    }
    
    @Override
    public boolean equals(Object obj) {
        UniversityStudent otherStudent = (UniversityStudent) obj;
        return name.equals(otherStudent.name);
    }
    
    @Override
    public int hashCode() {
        return name.hashCode();
    }
}
