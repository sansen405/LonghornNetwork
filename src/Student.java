import java.util.*;

/**
 * ABSTRACT BASE CLASS REPRESENTING A STUDENT
 */
public abstract class Student {

    protected Student() {
    }
    /**
     * THE STUDENT'S NAME
     */
    protected String name;
    /**
     * THE STUDENT'S AGE
     */
    protected int age;
    /**
     * THE STUDENT'S GENDER
     */
    protected String gender;
    /**
     * THE STUDENT'S YEAR IN SCHOOL
     */
    protected int year;
    /**
     * THE STUDENT'S MAJOR
     */
    protected String major;
    /**
     * THE STUDENT'S GPA
     */
    protected double gpa;
    /**
     * LIST OF PREFERRED ROOMMATE NAMES
     */
    protected List<String> roommatePreferences;
    /**
     * LIST OF PREVIOUS INTERNSHIP COMPANIES
     */
    protected List<String> previousInternships;

    /**
     * CALCULATES HOW STRONG THE CONNECTION IS WITH ANOTHER STUDENT
     * @param other THE OTHER STUDENT TO COMPARE WITH
     * @return AN INTEGER REPRESENTING CONNECTION STRENGTH
     */
    public abstract int calculateConnectionStrength(Student other);
}
