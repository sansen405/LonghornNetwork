import React, { useState, useEffect } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import GraphVisualization from './components/GraphVisualization';
import RoommatesView from './components/RoommatesView';
import ReferralPathFinder from './components/ReferralPathFinder';
import PodsView from './components/PodsView';
import MessagesView from './components/MessagesView';
import FriendRequestsView from './components/FriendRequestsView';
import StudentDetails from './components/StudentDetails';
import { buildGraph, assignRoommates, formPods } from './utils/dataLoader';

function App() {
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [students, setStudents] = useState([]);
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [roommates, setRoommates] = useState([]);
  const [pods, setPods] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('graph');

  const testCases = [
    { id: 0, name: 'Test Case 1 (from Main)', file: '/data/testCase1.json' },
    { id: 1, name: 'Test Case 2 (from Main)', file: '/data/testCase2.json' },
    { id: 2, name: 'Test Case 3 (from Main)', file: '/data/testCase3.json' },
    { id: 3, name: 'Test Case 4', file: '/data/testCase4.json' },
    { id: 4, name: 'Test Case 5', file: '/data/testCase5.json' },
    { id: 5, name: 'Test Case 6', file: '/data/testCase6.json' },
    { id: 6, name: 'Test Case 7', file: '/data/testCase7.json' }
  ];

  useEffect(() => {
    loadTestCase(selectedTestCase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestCase]);

  const loadTestCase = async (testCaseId) => {
    try {
      setLoading(true);
      const file = testCases[testCaseId].file;
      
      const response = await fetch(file);
      const data = await response.json();
      
      setStudents(data.students);
      
      // Calculate roommates
      const calculatedRoommates = assignRoommates(data.students);
      setRoommates(calculatedRoommates);
      
      // Build graph
      const graphData = buildGraph(data.students, calculatedRoommates);
      setGraph(graphData);
      
      // Form pods
      const calculatedPods = formPods(data.students, graphData, 3);
      setPods(calculatedPods);
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading test case:', err);
      setLoading(false);
    }
  };

  const handleStudentSelect = (studentName) => {
    const student = students.find(s => s.name === studentName);
    setSelectedStudent(student);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>Longhorn Network</h1>
          <p>Student Connection Platform</p>
        </div>
      </header>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="testcase-select">Test Case:</label>
          <select
            id="testcase-select"
            value={selectedTestCase}
            onChange={(e) => setSelectedTestCase(parseInt(e.target.value))}
            className="select-input"
          >
            {testCases.map((tc) => (
              <option key={tc.id} value={tc.id}>
                {tc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="view-tabs">
          <button
            className={`tab-button ${activeView === 'graph' ? 'active' : ''}`}
            onClick={() => setActiveView('graph')}
          >
            Network Graph
          </button>
          <button
            className={`tab-button ${activeView === 'roommates' ? 'active' : ''}`}
            onClick={() => setActiveView('roommates')}
          >
            Roommates
          </button>
          <button
            className={`tab-button ${activeView === 'pods' ? 'active' : ''}`}
            onClick={() => setActiveView('pods')}
          >
            Pods
          </button>
          <button
            className={`tab-button ${activeView === 'referral' ? 'active' : ''}`}
            onClick={() => setActiveView('referral')}
          >
            Referral Path
          </button>
          <button
            className={`tab-button ${activeView === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveView('messages')}
          >
            Messages
          </button>
          <button
            className={`tab-button ${activeView === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveView('requests')}
          >
            Friend Requests
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      )}

      {!loading && (
        <ErrorBoundary>
          <div className="main-content">
            <div className="visualization-area">
              {activeView === 'graph' && (
                <GraphVisualization
                  graph={graph}
                  onNodeSelect={handleStudentSelect}
                />
              )}
              {activeView === 'roommates' && (
                <RoommatesView roommates={roommates} students={students} />
              )}
              {activeView === 'pods' && (
                <PodsView pods={pods} />
              )}
              {activeView === 'referral' && (
                <ReferralPathFinder
                  students={students}
                  graph={graph}
                />
              )}
              {activeView === 'messages' && (
                <MessagesView students={students} />
              )}
              {activeView === 'requests' && (
                <FriendRequestsView students={students} />
              )}
            </div>

            <div className="sidebar">
              <StudentDetails
                student={selectedStudent}
                students={students}
                onStudentSelect={handleStudentSelect}
              />
            </div>
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;

