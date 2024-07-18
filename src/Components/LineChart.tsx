import "chartjs-adapter-date-fns";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import type { Datum } from "../services/api";

type ChartData = {
    x: number;
    y: number;
}[];

interface ChartProps {
    name: string;
    data: ChartData;
}

export function transformData(data: Datum[], filterType: keyof Datum, filterValue: string): ChartData {
    return data.filter(datum => datum[filterType] === filterValue).map(datum => ({ x: new Date(datum.date).getTime(), y: parseFloat(datum.value) })).sort((a, b) => a.x - b.x);
}

function LineChart(chartProps: ChartProps): React.JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chart = useRef<Chart>();

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            chart.current = new Chart(ctx, {
                type: "scatter",
                data: {
                    datasets: [{
                        data: chartProps.data,
                        showLine: true
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day"
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            color: "white",
                            text: chartProps.name
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        return () => {
            if (chart.current) {
                chart.current.destroy();
            }
        };
    }, []);

    return <canvas ref={canvasRef} />;
}

export default LineChart;
