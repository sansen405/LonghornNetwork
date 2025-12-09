import React from 'react';
import './StudentDetails.css';

const StudentDetails = ({ student, students, onStudentSelect }) => {
  if (!student) {
    return (
      <div className="details-empty">
        <p className="empty-text">Student Details</p>
        <p className="empty-hint">Select a student to view their profile</p>

        {students && students.length > 0 && (
          <div className="student-selector">
            <h3>Select Student</h3>
            <div className="selector-list">
              {students.map((s, idx) => (
                <button
                  key={idx}
                  className="selector-item"
                  onClick={() => onStudentSelect(s.name)}
                >
                  <div className="selector-avatar">{s.name[0]}</div>
                  <div className="selector-info">
                    <div className="selector-name">{s.name}</div>
                    <div className="selector-major">{s.major}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="student-details">
      <div className="details-header">
        <div className="header-avatar">{student.name[0]}</div>
        <div className="header-info">
          <h2>{student.name}</h2>
          <p className="header-major">{student.major || 'N/A'}</p>
        </div>
      </div>

      <div className="details-section">
        <h3>Basic Information</h3>
        <div className="info-rows">
          <div className="info-row">
            <span className="info-key">Age:</span>
            <span className="info-val">{student.age || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="info-key">Gender:</span>
            <span className="info-val">{student.gender || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="info-key">Year:</span>
            <span className="info-val">{student.year || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="info-key">GPA:</span>
            <span className="info-val gpa-highlight">{student.gpa || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="details-section">
        <h3>Internship Experience</h3>
        <div className="internships">
          {student.previousInternships && student.previousInternships.length > 0 ? (
            student.previousInternships.map((internship, idx) => (
              <div key={idx} className="internship-badge">
                {internship === 'None' || internship === '' ? (
                  <span className="none-badge">None</span>
                ) : (
                  internship
                )}
              </div>
            ))
          ) : (
            <p className="none-text">None</p>
          )}
        </div>
      </div>

      <div className="details-section">
        <h3>Roommate Preferences</h3>
        <div className="preferences">
          {student.roommatePreferences && student.roommatePreferences.length > 0 ? (
            student.roommatePreferences.map((pref, idx) => (
              <button
                key={idx}
                className="preference-btn"
                onClick={() => onStudentSelect && onStudentSelect(pref)}
              >
                <span className="pref-rank">#{idx + 1}</span>
                <span className="pref-name">{pref}</span>
              </button>
            ))
          ) : (
            <p className="none-text">None</p>
          )}
        </div>
      </div>

      <div className="details-section">
        <h3>Friend Requests</h3>
        <div className="requests-list">
          {student.friendRequests && student.friendRequests.length > 0 ? (
            student.friendRequests.map((request, idx) => (
              <div key={idx} className="request-item">
                <div className="request-avatar">
                  {(request.from || request.student || '?')[0]}
                </div>
                <div className="request-content">
                  <div className="request-name">
                    {request.from || request.student}
                  </div>
                  <div className={`request-status ${request.status.toLowerCase()}`}>
                    {request.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="none-text">None</p>
          )}
        </div>
      </div>

      <button
        className="clear-btn"
        onClick={() => onStudentSelect && onStudentSelect(null)}
      >
        Clear Selection
      </button>
    </div>
  );
};

export default StudentDetails;

