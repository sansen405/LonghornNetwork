import java.io.*;
import java.util.*;

/**
 * READS AND PARSES STUDENT DATA FROM FILES
 */
public class DataParser {
    private DataParser() {
    }
    /**
     * PARSES STUDENT INFORMATION FROM A FILE
     * @param filename THE NAME OF THE FILE TO READ
     * @return A LIST OF UNIVERSITY STUDENTS
     * @throws IOException IF THE FILE CANNOT BE READ
     */
    public static List<UniversityStudent> parseStudents(String filename) throws IOException {
        List<UniversityStudent> students = new ArrayList<>();
        BufferedReader br = new BufferedReader(new FileReader(filename));
        
        String name = "";
        int age = 0;
        String gender = "";
        int year = 0;
        String major = "";
        double gpa = 0;
        List<String> roommatePreferences = new ArrayList<>();
        List<String> previousInternships = new ArrayList<>();
        boolean hasName = false;
        boolean hasAge = false;
        boolean hasGender = false;
        boolean hasYear = false;
        boolean hasMajor = false;
        boolean hasGpa = false;
        boolean hasRoommatePreferences = false;
        
        String currline;
        
        while ((currline = br.readLine()) != null) {
            currline = currline.trim();
            
            if (currline.isEmpty()) {
                if (!hasName || name.isEmpty()) {
                    System.out.println("Parsing error: Missing required field 'Name' in student entry.");
                    System.out.println();
                    br.close();
                    return new ArrayList<>();
                }
                
                if (!hasAge) {
                    System.out.println("Parsing error: Missing required field 'Age' in student entry for " + name + ".");
                    System.out.println();
                    br.close();
                    return new ArrayList<>();
                }
                
                if (!hasGender) {
                    System.out.println("Parsing error: Missing required field 'Gender' in student entry for " + name + ".");
                    System.out.println();
                    br.close();
                    return new ArrayList<>();
                }
                
                if (!hasYear) {
                    System.out.println("Parsing error: Missing required field 'Year' in student entry for " + name + ".");
                    System.out.println();
                    br.close();
                    return new ArrayList<>();
                }
                
                if (!hasMajor) {
                    System.out.println("Parsing error: Missing required field 'Major' in student entry for " + name + ".");
                    System.out.println();
                    br.close();
                    return new ArrayList<>();
                }
                
                if (!hasGpa) {
                    System.out.println("Parsing error: Missing required field 'GPA' in student entry for " + name + ".");
                    System.out.println();
                    br.close();
                    return new ArrayList<>();
                }
                
                if (!hasRoommatePreferences) {
                    System.out.println("Parsing error: Missing required field 'RoommatePreferences' in student entry for " + name + ".");
                    System.out.println();
                    br.close();
                    return new ArrayList<>();
                }
                
                students.add(new UniversityStudent(name, age, gender, year, major, gpa, new ArrayList<>(roommatePreferences), new ArrayList<>(previousInternships)));
                
                name = "";
                age = 0;
                gender = "";
                year = 0;
                major = "";
                gpa = 0;
                roommatePreferences = new ArrayList<>();
                previousInternships = new ArrayList<>();
                hasName = false;
                hasAge = false;
                hasGender = false;
                hasYear = false;
                hasMajor = false;
                hasGpa = false;
                hasRoommatePreferences = false;
                continue;
            }
            
            if (currline.equals("Student:")) {
                continue;
            }
            
            if (!currline.contains(":")) {
                System.out.println("Parsing error: Incorrect format in line: '" + currline + "'. Expected format 'Name: <value>'.");
                System.out.println();
                br.close();
                return new ArrayList<>();
            }
            
            String[] parts = currline.split(":", 2);
            if (parts.length < 2) {
                System.out.println("Parsing error: Incorrect format in line: '" + currline + "'. Expected format 'Name: <value>'.");
                System.out.println();
                br.close();
                return new ArrayList<>();
            }
            
            String feature = parts[0].trim();
            String value = parts[1].trim();
            
            if (feature.isEmpty()) {
                System.out.println("Parsing error: Incorrect format in line: '" + currline + "'. Expected format 'Name: <value>'.");
                System.out.println();
                br.close();
                return new ArrayList<>();
            }
            
            switch (feature) {
                case "Name":
                    hasName = true;
                    name = value;
                    break;
                    
                case "Age":
                    hasAge = true;
                    try {
                        age = Integer.parseInt(value);
                    } catch (NumberFormatException e) {
                        System.out.println("Number format error: Invalid number format for age: '" + value + "' in student entry for " + name + ".");
                        System.out.println();
                        br.close();
                        return new ArrayList<>();
                    }
                    break;
                    
                case "Gender":
                    hasGender = true;
                    gender = value;
                    break;
                    
                case "Year":
                    hasYear = true;
                    try {
                        year = Integer.parseInt(value);
                    } catch (NumberFormatException e) {
                        System.out.println("Number format error: Invalid number format for year: '" + value + "' in student entry for " + name + ".");
                        System.out.println();
                        br.close();
                        return new ArrayList<>();
                    }
                    break;
                    
                case "Major":
                    hasMajor = true;
                    major = value;
                    break;
                    
                case "GPA":
                    hasGpa = true;
                    try {
                        gpa = Double.parseDouble(value);
                    } catch (NumberFormatException e) {
                        System.out.println("Number format error: Invalid number format for GPA: '" + value + "' in student entry for " + name + ".");
                        System.out.println();
                        br.close();
                        return new ArrayList<>();
                    }
                    break;
                    
                case "RoommatePreferences":
                    hasRoommatePreferences = true;
                    if (!value.isEmpty() && !value.equalsIgnoreCase("None")) {
                        String[] roommateNames = value.split(",");
                        for (String roommateName : roommateNames) {
                            roommatePreferences.add(roommateName.trim());
                        }
                    }
                    break;
                    
                case "PreviousInternships":
                    if (!value.isEmpty() && !value.equalsIgnoreCase("None")) {
                        String[] internshipNames = value.split(",");
                        for (String internshipName : internshipNames) {
                            previousInternships.add(internshipName.trim());
                        }
                    }
                    break;
                    
                default:
                    System.out.println("Parsing error: Incorrect format in line: '" + currline + "'. Expected format 'Name: <value>'.");
                    System.out.println();
                    br.close();
                    return new ArrayList<>();
            }
        }
        
        if (hasName && !name.isEmpty()) {
            if (!hasAge) {
                System.out.println("Parsing error: Missing required field 'Age' in student entry for " + name + ".");
                System.out.println();
                br.close();
                return new ArrayList<>();
            }
            
            if (!hasGender) {
                System.out.println("Parsing error: Missing required field 'Gender' in student entry for " + name + ".");
                System.out.println();
                br.close();
                return new ArrayList<>();
            }
            
            if (!hasYear) {
                System.out.println("Parsing error: Missing required field 'Year' in student entry for " + name + ".");
                System.out.println();
                br.close();
                return new ArrayList<>();
            }
            
            if (!hasMajor) {
                System.out.println("Parsing error: Missing required field 'Major' in student entry for " + name + ".");
                System.out.println();
                br.close();
                return new ArrayList<>();
            }
            
            if (!hasGpa) {
                System.out.println("Parsing error: Missing required field 'GPA' in student entry for " + name + ".");
                System.out.println();
                br.close();
                return new ArrayList<>();
            }
            
            if (!hasRoommatePreferences) {
                System.out.println("Parsing error: Missing required field 'RoommatePreferences' in student entry for " + name + ".");
                System.out.println();
                br.close();
                return new ArrayList<>();
            }
            
            students.add(new UniversityStudent(name, age, gender, year, major, gpa, roommatePreferences, previousInternships));
        }
        
        br.close();
        return students;
    }
}
