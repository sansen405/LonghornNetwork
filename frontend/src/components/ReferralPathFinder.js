import React, { useState } from 'react';
import { findReferralPath } from '../utils/dataLoader';
import './ReferralPathFinder.css';

const ReferralPathFinder = ({ students, graph }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [referralPath, setReferralPath] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  // Extract unique companies
  const companies = students
    .flatMap(s => s.previousInternships || [])
    .filter((company, index, arr) => 
      company !== 'None' && company !== '' && arr.indexOf(company) === index
    )
    .sort();

  const handleSearch = () => {
    if (!selectedStudent || !targetCompany) return;

    setSearching(true);
    setSearched(false);

    // Simulate search delay for better UX
    setTimeout(() => {
      const path = findReferralPath(students, graph, selectedStudent, targetCompany);
      setReferralPath(path);
      setSearching(false);
      setSearched(true);
    }, 500);
  };

  return (
    <div className="referral-container">
      <div className="referral-header">
        <h2>Referral Path Finder</h2>
        <p className="referral-subtitle">
          Find the strongest connection path to reach someone with internship experience
        </p>
      </div>

      <div className="search-panel">
        <div className="search-inputs">
          <div className="input-field">
            <label>Starting Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="search-select"
            >
              <option value="">Choose a student...</option>
              {students.map((student, idx) => (
                <option key={idx} value={student.name}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-field">
            <label>Target Company</label>
            <select
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="search-select"
            >
              <option value="">Choose a company...</option>
              {companies.map((company, idx) => (
                <option key={idx} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={searching || !selectedStudent || !targetCompany}
          className="search-btn"
        >
          {searching ? 'Searching...' : 'Find Referral Path'}
        </button>
      </div>

      {searching && (
        <div className="searching-state">
          <div className="search-spinner"></div>
          <p>Searching for the best path using Dijkstra's algorithm...</p>
        </div>
      )}

      {searched && referralPath.length > 0 && (
        <div className="results-panel">
          <div className="results-header">
            <h3>Referral Path Found</h3>
            <span className="path-badge">
              {referralPath.length} {referralPath.length === 1 ? 'hop' : 'hops'}
            </span>
          </div>

          <div className="path-visual">
            {referralPath.map((person, index) => {
              const hasTarget = person.previousInternships?.some(
                i => i.toLowerCase() === targetCompany.toLowerCase()
              );

              return (
                <React.Fragment key={index}>
                  <div className={`path-step ${hasTarget ? 'target-step' : ''}`}>
                    <div className="step-avatar">
                      {person.name[0]}
                    </div>
                    <div className="step-info">
                      <div className="step-name">{person.name}</div>
                      <div className="step-major">{person.major}</div>
                      {hasTarget && (
                        <div className="step-company">
                          Interned at {targetCompany}
                        </div>
                      )}
                    </div>
                    {index === 0 && <div className="step-badge start-badge">Start</div>}
                    {hasTarget && <div className="step-badge target-badge">Target</div>}
                  </div>

                  {index < referralPath.length - 1 && (
                    <div className="path-arrow">
                      <span>→</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {searched && referralPath.length === 0 && (
        <div className="no-path">
          <p>No referral path found</p>
          <p className="no-path-hint">
            Try selecting a different student or company
          </p>
        </div>
      )}

    </div>
  );
};

export default ReferralPathFinder;

