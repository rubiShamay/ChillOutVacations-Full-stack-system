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
          label: 'Followers Count',
          data: values,
          borderWidth: 1,
          fill: true,
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
    });

    return () => {
      chart.destroy();
    };
  }, [vacations]);

  function download(): void {
    alert("CSV")
  }
  return (
    <div className="Chart">
      <CSVLink data={vacations} filename='vacation.csv'>
        <Button onClick={download}>
          Download <FileDownloadIcon></FileDownloadIcon>
        </Button>
      </CSVLink>
      <canvas id="acquisitions"></canvas>
    </div>
  );
}

export default ChartDate;
