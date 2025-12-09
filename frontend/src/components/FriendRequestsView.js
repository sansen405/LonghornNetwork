import React, { useState } from 'react';
import './FriendRequestsView.css';

const FriendRequestsView = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState('');

  // Get all friend requests for selected student
  const getStudentRequests = () => {
    if (!selectedStudent) return { sent: [], received: [] };
    
    const student = students.find(s => s.name === selectedStudent);
    if (!student) return { sent: [], received: [] };

    // Received requests
    const received = student.friendRequests || [];

    // Sent requests (find students who have this person in their friend requests)
    const sent = students
      .filter(s => s.friendRequests && s.friendRequests.some(req => req.from === selectedStudent))
      .map(s => {
        const request = s.friendRequests.find(req => req.from === selectedStudent);
        return {
          to: s.name,
          status: request.status,
          time: request.time
        };
      });

    return { received, sent };
  };

  const requests = getStudentRequests();

  return (
    <div className="friend-requests-container">
      <div className="friend-requests-header">
        <h2>Friend Requests</h2>
        <p className="subtitle">
          View sent and received friend requests
        </p>
      </div>

      <div className="request-selector">
        <label>Select Student</label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="student-select"
        >
          <option value="">Choose a student...</option>
          {students.map((s, idx) => (
            <option key={idx} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {!selectedStudent ? (
        <div className="no-selection">
          <p>Select a student to view their friend request history</p>
        </div>
      ) : (
        <div className="requests-content">
          <div className="requests-section">
            <h3>Received Requests</h3>
            <div className="requests-list">
              {requests.received.length > 0 ? (
                requests.received.map((req, idx) => (
                  <div key={idx} className="request-card">
                    <div className="request-avatar">
                      {(req.from || req.student || '?')[0]}
                    </div>
                    <div className="request-details">
                      <div className="request-name">{req.from || req.student}</div>
                      <div className="request-time">{req.time}</div>
                    </div>
                    <div className={`request-status ${req.status.toLowerCase()}`}>
                      {req.status}
                    </div>
                  </div>
                ))
              ) : (
                <p className="none-text">None</p>
              )}
            </div>
          </div>

          <div className="requests-section">
            <h3>Sent Requests</h3>
            <div className="requests-list">
              {requests.sent.length > 0 ? (
                requests.sent.map((req, idx) => (
                  <div key={idx} className="request-card">
                    <div className="request-avatar">
                      {req.to[0]}
                    </div>
                    <div className="request-details">
                      <div className="request-name">{req.to}</div>
                      <div className="request-time">{req.time}</div>
                    </div>
                    <div className={`request-status ${req.status.toLowerCase()}`}>
                      {req.status}
                    </div>
                  </div>
                ))
              ) : (
                <p className="none-text">None</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendRequestsView;

