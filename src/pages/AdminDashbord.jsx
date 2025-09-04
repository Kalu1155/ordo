import React from "react";


const AdminDashboard = () => {
  return (
    <div className="dashboard">
  
      <main className="main">
        <section className="content">
          <div className="cards">
            <div className="card">
              <h4>Total Orders</h4>
              <p>120</p>
            </div>
            <div className="card">
              <h4>Reservations</h4>
              <p>35</p>
            </div>
            <div className="card">
              <h4>Active Staff</h4>
              <p>5</p>
            </div>
            <div className="card">
              <h4>Revenue</h4>
              <p>₦4,250</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
