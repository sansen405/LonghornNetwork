import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import './GraphVisualization.css';

const GraphVisualization = ({ graph, onNodeSelect }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !graph || !graph.nodes || !graph.edges) {
      return;
    }

    // Small delay to prevent ResizeObserver warnings
    const timer = setTimeout(() => {
      initializeGraph();
    }, 100);

    // Handle window resize with debounce to prevent ResizeObserver errors
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (networkRef.current) {
          try {
            networkRef.current.redraw();
          } catch (err) {
            // Suppress any resize errors
          }
        }
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph]);

  const initializeGraph = () => {
    if (!containerRef.current || !graph || !graph.nodes || !graph.edges) {
      return;
    }

    // Transform data for vis-network
    const nodes = graph.nodes.map(node => ({
      id: node.name,
      label: node.name,
      color: {
        background: '#b39ddb',
        border: '#9575cd',
        highlight: {
          background: '#b39ddb',
          border: '#9575cd'
        }
      },
      font: {
        color: '#ffffff',
        size: 24,
        face: 'Inter, Arial, sans-serif',
        bold: true
      },
      shape: 'circle',
      size: 100,
      fixed: {
        x: false,
        y: false
      }
    }));

    const edges = graph.edges.map(edge => ({
      from: edge.from,
      to: edge.to,
      label: `${edge.weight}`,
      color: {
        color: '#000000'
      },
      width: 3 + Math.ceil(edge.weight / 2),
      font: {
        size: 24,
        align: 'middle',
        background: 'rgba(255, 255, 255, 0.95)',
        strokeWidth: 0,
        color: '#000000',
        face: 'Inter, Arial, sans-serif',
        bold: true
      },
      smooth: {
        enabled: true,
        type: 'continuous',
        roundness: 0.5
      }
    }));

    const data = { nodes, edges };

    const options = {
      nodes: {
        borderWidth: 5,
        borderWidthSelected: 5,
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.4)',
          size: 20,
          x: 4,
          y: 4
        },
        scaling: {
          min: 100,
          max: 100
        }
      },
      edges: {
        arrows: {
          to: { enabled: false }
        },
        labelHighlightBold: false,
        shadow: {
          enabled: false
        },
        font: {
          size: 24,
          face: 'Inter, Arial, sans-serif',
          bold: true
        },
        scaling: {
          customScalingFunction: function (min, max, total, value) {
            return value;
          },
          min: 1,
          max: 1
        }
      },
      physics: {
        enabled: true,
        stabilization: {
          enabled: true,
          iterations: 300,
          fit: true
        },
        barnesHut: {
          gravitationalConstant: -20000,
          centralGravity: 0.15,
          springLength: 300,
          springConstant: 0.03,
          damping: 0.09,
          avoidOverlap: 1
        }
      },
      interaction: {
        hover: false,
        hoverConnectedEdges: false,
        tooltipDelay: 0,
        navigationButtons: false,
        keyboard: false,
        zoomView: false,
        dragView: false,
        selectableEdges: false,
        selectable: false,
        dragNodes: false
      },
      layout: {
        improvedLayout: true
      },
      // Disable automatic resize to prevent ResizeObserver errors
      autoResize: false
    };

    // Create network
    if (networkRef.current) {
      networkRef.current.destroy();
    }

    networkRef.current = new Network(containerRef.current, data, options);

    // Disable mouse wheel zoom - keep scale at 1.0
    networkRef.current.on('zoom', () => {
      try {
        networkRef.current.moveTo({ scale: 1.0 });
      } catch (err) {
        // Suppress zoom errors
      }
    });

    // Node clicking disabled - use sidebar selector instead

    // Fit the network after stabilization (wrapped in try-catch to prevent errors)
    try {
      networkRef.current.once('stabilizationIterationsDone', () => {
        if (networkRef.current) {
          networkRef.current.fit({
            animation: {
              duration: 500,
              easingFunction: 'easeInOutQuad'
            }
          });
        }
      });
    } catch (err) {
      console.log('Stabilization completed');
    }
  };

  if (!graph || !graph.nodes || graph.nodes.length === 0) {
    return (
      <div className="graph-empty">
        <p>No graph data available</p>
      </div>
    );
  }

  return (
    <div className="graph-container">
      <div className="graph-header">
        <h2>Student Connection Graph</h2>
        <div className="graph-stats">
          <span className="stat-badge">{graph.nodes.length} Students</span>
          <span className="stat-badge">{graph.edges.length} Connections</span>
        </div>
        <p className="graph-hint">
          Hover over edges to see connection strength
        </p>
      </div>
      <div ref={containerRef} className="graph-canvas" />
    </div>
  );
};

export default GraphVisualization;

