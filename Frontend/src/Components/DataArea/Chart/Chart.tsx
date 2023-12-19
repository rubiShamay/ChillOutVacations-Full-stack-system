import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import notificationService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/vacationsService';
import appConfig from '../../../Utils/app-config';
import './Chart.css';


function ChartDate(): JSX.Element {

  const navigate = useNavigate()

  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    vacationsService
      .getAllVacationsToAdmin()
      .then((beVacation) => setVacations(beVacation))
      .catch(err => {
        if (err.response.status === 401) {
          navigate(appConfig.loginRoute)
          notificationService.error(err)
        } else if (err.response.status === 403) {
          navigate(appConfig.vacationsRoute)
          notificationService.error(err)
        }
      })
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('acquisitions') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!vacations || vacations.length === 0) {
      // Data not available yet, do not create the chart
      return;
    }


    const names = vacations.map((v) => v.name);
    const values = vacations.map((v) => v.followersCount);

    const chartData = {
      labels: names,
      datasets: [
        {
          label: `Followers Like's`,
          data: values,
          borderWidth: 1,
          fill: true,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ]
        },
      ]
    }

    const chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Vacations',
            },
            stacked: true
          },
          y: {
            title: {
              display: true,
              text: `Like's Count`,
            },
            stacked: true,
            min: 0,
            ticks: { stepSize: 1 }
          },
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [vacations]);

  return (
    <div className="Chart">
      <CSVLink data={vacations} filename='vacation.csv'>
        <Button style={{ textTransform: 'none' }} variant="outlined">
          Export Data <FileDownloadIcon></FileDownloadIcon>
        </Button>
      </CSVLink>
      <canvas id="acquisitions"></canvas>
    </div>
  );
}

export default ChartDate;
