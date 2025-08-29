import React from "react";


const AdminDashboard = () => {
  return (
    <div className="dashboard">
  
      <main className="main">
        <section className="content">
          <div className="cards">
            <div className="card">
              <h3>Total Orders</h3>
              <p>120</p>
            </div>
            <div className="card">
              <h3>Reservations</h3>
              <p>35</p>
            </div>
            <div className="card">
              <h3>Active Staff</h3>
              <p>5</p>
            </div>
            <div className="card">
              <h3>Revenue</h3>
              <p>$4,250</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
