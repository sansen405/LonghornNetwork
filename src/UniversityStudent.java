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
    }

    /**
     * GETS THE STUDENT'S ASSIGNED ROOMMATE
     * @return THE ROOMMATE OR NULL IF NONE ASSIGNED
     */
    public UniversityStudent getRoommate() {
        return null;
    }

    /**
     * SETS THE STUDENT'S ROOMMATE
     * @param roommate THE ROOMMATE TO ASSIGN
     */
    public void setRoommate(UniversityStudent roommate) {
    }

    /**
     * CALCULATES CONNECTION STRENGTH WITH ANOTHER STUDENT
     * @param other THE OTHER STUDENT
     * @return THE CONNECTION STRENGTH VALUE
     */
    @Override
    public int calculateConnectionStrength(Student other) {
        return 0;
    }
}
