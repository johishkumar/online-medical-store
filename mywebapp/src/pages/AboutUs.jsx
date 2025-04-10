const AboutUs = () => {
  return (
    <div
      className="container mt-4"
      style={{
        backgroundColor: "#f9f9f9",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "Poppins, sans-serif",
        lineHeight: "1.8",
      }}
    >
      <h2
        style={{
          color: "#0B5345",
          fontWeight: "600",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        About Us
      </h2>

      <p style={{ color: "#333", marginBottom: "15px", textAlign: "justify" }}>
        Access to medicines and healthcare products is often hindered by geographical constraints, long pharmacy queues,
        and limited stock availability. Patients in remote areas struggle to obtain essential medicines on time, which can
        pose serious health risks. Chronic patients often face difficulties in maintaining regular medication schedules,
        leading to complications. The inconvenience of traveling to pharmacies, especially for the elderly and individuals
        with mobility issues, adds to the problem.
      </p>

      <p style={{ color: "#333", textAlign: "justify" }}>
        Traditional pharmacies require individuals to visit in person, which can be inconvenient and time-consuming.
        For patients living in rural or underserved areas, accessing necessary medicines becomes particularly challenging.
        Chronic patients who rely on regular medication may experience delays due to stock shortages or transportation issues.
        A more robust system is essential to improve accessibility, reliability, and overall user satisfaction.
      </p>

      {/* Video Section */}
      <div className="text-center mt-4">
        <video
          controls
          width="560"
          height="315"
          style={{
            borderRadius: "10px",
            maxWidth: "100%",
            border: "2px solid #1ABC9C",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <source src="/video/Untitled design1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default AboutUs;
