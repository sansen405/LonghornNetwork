import React, { useState, useEffect } from 'react';
import './MessagesView.css';

const MessagesView = ({ students }) => {
  const [student1, setStudent1] = useState('');
  const [student2, setStudent2] = useState('');
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    if (student1 && student2 && student1 !== student2) {
      loadConversation();
    } else {
      setConversation([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student1, student2]);

  const loadConversation = () => {
    const s1 = students.find(s => s.name === student1);
    const s2 = students.find(s => s.name === student2);

    if (!s1 || !s2) {
      setConversation([]);
      return;
    }

    // Get messages from student1 to student2
    const messages1 = (s1.chatHistory || [])
      .filter(msg => msg.with === student2)
      .map(msg => ({
        from: student1,
        to: student2,
        message: msg.message,
        time: msg.time,
        direction: msg.direction
      }));

    // Get messages from student2 to student1
    const messages2 = (s2.chatHistory || [])
      .filter(msg => msg.with === student1)
      .map(msg => ({
        from: student2,
        to: student1,
        message: msg.message,
        time: msg.time,
        direction: msg.direction
      }));

    // Combine and sort by time (simplified - in real app would parse timestamps)
    const allMessages = [...messages1, ...messages2];
    
    // Sort by attempting to parse time strings
    allMessages.sort((a, b) => {
      const getMinutes = (timeStr) => {
        if (timeStr.includes('minutes ago')) return parseInt(timeStr);
        if (timeStr.includes('hour ago')) return 60;
        if (timeStr.includes('hours ago')) return parseInt(timeStr) * 60;
        if (timeStr.includes('day ago')) return 1440;
        if (timeStr.includes('days ago')) return parseInt(timeStr) * 1440;
        if (timeStr.includes('week ago')) return 10080;
        if (timeStr.includes('weeks ago')) return parseInt(timeStr) * 10080;
        if (timeStr.includes('month ago')) return 43200;
        return 999999; // very old
      };
      return getMinutes(a.time) - getMinutes(b.time);
    });

    setConversation(allMessages);
  };

  const getStudentInfo = (studentName) => {
    const student = students.find(s => s.name === studentName);
    return student || {};
  };

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h2>Messages</h2>
        <p className="messages-subtitle">
          View conversations between students
        </p>
      </div>

      <div className="message-selectors">
        <div className="selector-group">
          <label>First Student</label>
          <select
            value={student1}
            onChange={(e) => setStudent1(e.target.value)}
            className="student-selector"
          >
            <option value="">Choose a student...</option>
            {students.map((s, idx) => (
              <option key={idx} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="selector-divider">↔</div>

        <div className="selector-group">
          <label>Second Student</label>
          <select
            value={student2}
            onChange={(e) => setStudent2(e.target.value)}
            className="student-selector"
          >
            <option value="">Choose a student...</option>
            {students
              .filter(s => s.name !== student1)
              .map((s, idx) => (
                <option key={idx} value={s.name}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {!student1 || !student2 ? (
        <div className="no-selection">
          <p>Select two students to view their conversation</p>
        </div>
      ) : student1 === student2 ? (
        <div className="no-selection">
          <p>Please select two different students</p>
        </div>
      ) : conversation.length === 0 ? (
        <div className="no-messages">
          <p>No messages found between {student1} and {student2}</p>
          <p className="hint">These students haven't communicated yet</p>
        </div>
      ) : (
        <div className="conversation-area">
          <div className="conversation-header">
            <div className="participant">
              <div className="participant-avatar">
                {student1[0]}
              </div>
              <div className="participant-info">
                <div className="participant-name">{student1}</div>
                <div className="participant-major">
                  {getStudentInfo(student1).major || 'Student'}
                </div>
              </div>
            </div>

            <div className="conversation-stats">
              <span className="message-count">
                {conversation.length} {conversation.length === 1 ? 'message' : 'messages'}
              </span>
            </div>

            <div className="participant">
              <div className="participant-info" style={{ textAlign: 'right' }}>
                <div className="participant-name">{student2}</div>
                <div className="participant-major">
                  {getStudentInfo(student2).major || 'Student'}
                </div>
              </div>
              <div className="participant-avatar">
                {student2[0]}
              </div>
            </div>
          </div>

          <div className="conversation-messages">
            {conversation.map((msg, idx) => (
              <div
                key={idx}
                className={`message-bubble ${msg.from === student1 ? 'from-left' : 'from-right'}`}
              >
                <div className="message-sender">{msg.from}</div>
                <div className="message-content">{msg.message}</div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesView;

