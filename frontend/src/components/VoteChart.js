// src/components/VoteChart.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const VoteChart = ({ yesVotes, noVotes, chartType = "doughnut" }) => {
  const totalVotes = yesVotes + noVotes;

  if (totalVotes === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          color: "#718096",
          background: "white",
          borderRadius: "15px",
          border: "2px dashed #e2e8f0",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          marginBottom: "2rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <img
            src="/bayrou.jpeg"
            alt="François Bayrou attend"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              opacity: 0.7,
              filter: "grayscale(50%)",
            }}
          />
        </div>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📊</div>
        <p>Aucun vote pour le moment</p>
        <p>
          <small>Bayrou attend patiemment vos opinions...</small>
        </p>
      </div>
    );
  }

  const chartData = {
    labels: ["👍 Oui, il nous manque", "👎 Non, on s'en passe"],
    datasets: [
      {
        data: [yesVotes, noVotes],
        backgroundColor: [
          "rgba(72, 187, 120, 0.8)",
          "rgba(245, 101, 101, 0.8)",
        ],
        borderColor: ["rgba(72, 187, 120, 1)", "rgba(245, 101, 101, 1)"],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(72, 187, 120, 0.9)",
          "rgba(245, 101, 101, 0.9)",
        ],
        hoverBorderWidth: 3,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 14,
            weight: "600",
          },
          color: "#4a5568",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        cornerRadius: 10,
        displayColors: true,
        callbacks: {
          label: function (context) {
            const percentage = ((context.parsed / totalVotes) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} votes (${percentage}%)`;
          },
        },
      },
    },
    cutout: "60%",
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        cornerRadius: 10,
        callbacks: {
          label: function (context) {
            const percentage = ((context.parsed.y / totalVotes) * 100).toFixed(
              1
            );
            return `${context.parsed.y} votes (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#718096",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(226, 232, 240, 0.5)",
        },
      },
      x: {
        ticks: {
          color: "#4a5568",
          font: {
            size: 12,
            weight: "600",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutBounce",
    },
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "15px",
        padding: "2rem",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h3 style={{ color: "#4a5568", margin: 0 }}>
          📈 Visualisation des votes
        </h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.5rem 1rem",
              border:
                chartType === "doughnut"
                  ? "2px solid #667eea"
                  : "1px solid #e2e8f0",
              borderRadius: "8px",
              background: chartType === "doughnut" ? "#667eea" : "white",
              color: chartType === "doughnut" ? "white" : "#4a5568",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
          >
            🍩 Camembert
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.5rem 1rem",
              border:
                chartType === "bar" ? "2px solid #667eea" : "1px solid #e2e8f0",
              borderRadius: "8px",
              background: chartType === "bar" ? "#667eea" : "white",
              color: chartType === "bar" ? "white" : "#4a5568",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
          >
            📊 Barres
          </button>
        </div>
      </div>

      <div style={{ height: "300px", position: "relative" }}>
        {chartType === "doughnut" ? (
          <Doughnut data={chartData} options={doughnutOptions} />
        ) : (
          <Bar data={chartData} options={barOptions} />
        )}
      </div>

      {/* Fun stats with Bayrou */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "linear-gradient(135deg, #f7fafc, #edf2f7)",
          borderRadius: "10px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Bayrou image appears when "Oui" wins or there's a tie */}
        {yesVotes >= noVotes && totalVotes > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "10px",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #48bb78",
              animation:
                yesVotes > noVotes ? "bounce 1s infinite" : "pulse 2s infinite",
              boxShadow: "0 5px 15px rgba(72, 187, 120, 0.4)",
            }}
          >
            <img
              src="/bayrou.jpeg"
              alt="François Bayrou"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <div
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#4a5568",
            marginBottom: "0.5rem",
          }}
        >
          {yesVotes > noVotes
            ? "🎉 La nostalgie l'emporte !"
            : noVotes > yesVotes
            ? "😢 On passe à autre chose !"
            : "⚖️ Égalité parfaite !"}
        </div>

        {yesVotes !== noVotes && (
          <div style={{ fontSize: "0.9rem", color: "#718096" }}>
            {yesVotes > noVotes
              ? `${(((yesVotes - noVotes) / totalVotes) * 100).toFixed(
                  1
                )}% d'avance pour le "Oui" - Bayrou sourit !`
              : `${(((noVotes - yesVotes) / totalVotes) * 100).toFixed(
                  1
                )}% d'avance pour le "Non" - Bayrou pleure...`}
          </div>
        )}

        {yesVotes === noVotes && totalVotes > 0 && (
          <div style={{ fontSize: "0.9rem", color: "#718096" }}>
            Bayrou observe ce match nul avec intérêt...
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteChart;
