'use client'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
)

interface Brand {
    name: string
    rank: number
    confidence: number
}

interface VisibilityChartProps {
    brands: Brand[]
}

export default function VisibilityChart({ brands }: VisibilityChartProps) {
    // Visibility Score = (1 / Rank) * Confidence * 100
    const chartData = {
        labels: brands.map(b => b.name),
        datasets: [
            {
                label: 'Visibility Score',
                data: brands.map(b => (1 / b.rank) * b.confidence * 100),
                backgroundColor: 'rgba(99, 102, 241, 0.4)',
                borderColor: 'rgba(99, 102, 241, 0.8)',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(99, 102, 241, 0.6)',
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(10, 10, 12, 0.8)',
                titleColor: '#fff',
                bodyColor: '#a5b4fc',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.3)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.3)',
                },
            },
        },
    }

    return (
        <div className="h-64 w-full">
            <Bar data={chartData} options={options} />
        </div>
    )
}
