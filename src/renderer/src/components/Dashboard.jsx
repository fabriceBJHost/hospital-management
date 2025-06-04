import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Container, Box } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaFileAlt, FaNotesMedical, FaUserInjured, FaUserMd } from 'react-icons/fa';
import StatCard from './StatCard';
import AppointmentStatusCard from './AppointmentStatutCard';
import HeaderTitle from './templates/HeaderTitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Fake stats
  const stats = {
    prescriptions: 40,
  };

  const appointmentStatusData = {
    labels: ['Scheduled', 'Completed', 'Cancelled'],
    datasets: [
      {
        label: 'Appointment Status',
        data: [50, 25, 10],
        backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350'],
      },
    ],
  };

  const patientTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Patients',
        data: [5, 15, 10, 20, 25, 30],
        borderColor: '#42a5f5',
        fill: false,
      },
    ],
  };

  const prescriptionData = {
    labels: ['Antibiotics', 'Painkillers', 'Antidepressants', 'Other'],
    datasets: [
      {
        label: 'Prescriptions by Type',
        data: [12, 19, 7, 2],
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffca28', '#ab47bc'],
      },
    ],
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
          {/* patient statistique */}
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Patients"
              value={120}
              icon={<FaUserInjured size={24} />}
              color="#1976d2"
              trend={{ value: 12, isPositive: true, label: "ce mois ci" }}
            />
          </Grid>

          {/* docteur statistique */}
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Docteur"
              value={15}
              icon={<FaUserMd size={24} />}
              color="#00acc1"
            />
          </Grid>

          {/* rendezvous statistique */}
          <Grid item xs={12} sm={6} md={4}>
            <AppointmentStatusCard
              total={85}
              cancelled={10}
              completed={25}
              scheduled={50}
            />
          </Grid>

          {/* dossier medical */}
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Dossier Médical"
              value={60}
              icon={<FaFileAlt size={24} />}
              color="#43a047"
              trend={{ value: 5, isPositive: true, label: "cette semaine" }}
            />
          </Grid>

          {/* prescriptions */}
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Prescriptions"
              value={40}
              icon={<FaNotesMedical size={24} />}
              color="#e53935"
              trend={{ value: 3, isNeutral: true, label: "from last week" }}
            />
          </Grid>
        </Grid>


        <Grid container spacing={4} style={{ marginTop: 20 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Appointment Status</Typography>
                <Pie data={appointmentStatusData} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">New Patient Trends</Typography>
                <Line data={patientTrendData} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Prescriptions by Category</Typography>
                <Bar data={prescriptionData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard
