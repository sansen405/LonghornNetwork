import React from 'react';
import './RoommatesView.css';

const RoommatesView = ({ roommates, students }) => {
  if (!roommates || roommates.length === 0) {
    return (
      <div className="roommates-empty">
        <p>No roommate pairings found</p>
        <p className="hint">Gale-Shapley algorithm will match students based on preferences</p>
      </div>
    );
  }

  return (
    <div className="roommates-container">
      <div className="roommates-header">
        <h2>Roommate Pairings</h2>
        <div className="roommates-stats">
          <span className="stat-item">{roommates.length} Pairs</span>
          <span className="stat-item">{roommates.length * 2} Students Matched</span>
        </div>
      </div>

      <div className="roommates-grid">
        {roommates.map((pair, index) => {
          const student1 = students.find(s => s.name === pair.student1) || {};
          const student2 = students.find(s => s.name === pair.student2) || {};

          return (
            <div key={index} className="roommate-card">
              <div className="card-header">
                <span className="pair-label">Pair {index + 1}</span>
                <span className="connection-strength">
                  Strength: {pair.connectionStrength}
                </span>
              </div>

              <div className="roommate-pair">
                <div className="roommate-person">
                  <div className="avatar">
                    {(pair.student1 || '?')[0]}
                  </div>
                  <div className="person-info">
                    <h3>{pair.student1 || 'Unknown'}</h3>
                    <p className="major">{student1.major || 'N/A'}</p>
                    <p className="gpa">GPA: {student1.gpa || 'N/A'}</p>
                  </div>
                </div>

                <div className="connector">
                  <span className="connector-icon">↔</span>
                </div>

                <div className="roommate-person">
                  <div className="avatar">
                    {(pair.student2 || '?')[0]}
                  </div>
                  <div className="person-info">
                    <h3>{pair.student2 || 'Unknown'}</h3>
                    <p className="major">{student2.major || 'N/A'}</p>
                    <p className="gpa">GPA: {student2.gpa || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="unmatched-section">
        <h3>Unmatched Students</h3>
        <div className="unmatched-list">
          {students
            .filter(s => !roommates.some(p => p.student1 === s.name || p.student2 === s.name))
            .map((student, idx) => (
              <div key={idx} className="unmatched-item">
                <div className="unmatched-avatar">{student.name[0]}</div>
                <div className="unmatched-info">
                  <span className="unmatched-name">{student.name}</span>
                  <span className="unmatched-reason">
                    {!student.roommatePreferences || student.roommatePreferences.length === 0
                      ? 'No preferences listed'
                      : 'No match found'}
                  </span>
                </div>
              </div>
            ))}
          {students.length > 0 && 
            students.filter(s => !roommates.some(p => p.student1 === s.name || p.student2 === s.name)).length === 0 && (
            <p className="all-matched">All students with preferences successfully matched</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoommatesView;

