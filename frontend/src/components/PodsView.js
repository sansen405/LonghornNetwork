import React from 'react';
import './PodsView.css';

const PodsView = ({ pods }) => {
  if (!pods || pods.length === 0) {
    return (
      <div className="pods-empty">
        <p>No pod formations found</p>
        <p className="hint">Pods are formed using Prim's algorithm to maximize connections</p>
      </div>
    );
  }

  const podColors = [
    { bg: '#fff3e0', border: '#ff9800', text: '#e65100' },
    { bg: '#e8f5e9', border: '#4caf50', text: '#1b5e20' },
    { bg: '#e3f2fd', border: '#2196f3', text: '#0d47a1' },
    { bg: '#f3e5f5', border: '#9c27b0', text: '#4a148c' },
    { bg: '#fce4ec', border: '#e91e63', text: '#880e4f' },
    { bg: '#e0f2f1', border: '#009688', text: '#004d40' }
  ];

  const getColorForPod = (index) => podColors[index % podColors.length];

  return (
    <div className="pods-container">
      <div className="pods-header">
        <h2>Pod Formations</h2>
        <div className="pods-stats">
          <span className="stat-badge">{pods.length} Pods</span>
          <span className="stat-badge">
            {pods.reduce((sum, pod) => sum + pod.members.length, 0)} Students
          </span>
        </div>
      </div>

      <div className="pods-grid">
        {pods.map((pod, index) => {
          const colors = getColorForPod(index);
          return (
            <div
              key={index}
              className="pod-card"
              style={{
                background: colors.bg,
                borderColor: colors.border
              }}
            >
              <div className="pod-card-header">
                <span className="pod-name" style={{ color: colors.text }}>
                  Pod {index + 1}
                </span>
                <span className="member-count" style={{ color: colors.text }}>
                  {pod.members.length} {pod.members.length === 1 ? 'Member' : 'Members'}
                </span>
              </div>

              <div className="pod-members">
                {pod.members.map((member, idx) => (
                  <div key={idx} className="pod-member">
                    <div
                      className="member-avatar"
                      style={{ background: colors.border }}
                    >
                      {(member.name || member)[0]}
                    </div>
                    <div className="member-details">
                      <div className="member-name">{member.name || member}</div>
                      {member.major && (
                        <div className="member-major">{member.major}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {pod.totalWeight > 0 && (
                <div
                  className="pod-footer"
                  style={{ borderTopColor: colors.border }}
                >
                  <div className="pod-stat">
                    <span className="stat-label">Total Strength</span>
                    <span className="stat-value" style={{ color: colors.text }}>
                      {pod.totalWeight}
                    </span>
                  </div>
                  <div className="pod-stat">
                    <span className="stat-label">Avg Strength</span>
                    <span className="stat-value" style={{ color: colors.text }}>
                      {(pod.totalWeight / Math.max(1, pod.members.length)).toFixed(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default PodsView;

