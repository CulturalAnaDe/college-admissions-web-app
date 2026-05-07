import ReactECharts from 'echarts-for-react'

const PieChart = ({ name, data }) => {
	const option = {
		tooltip: { trigger: 'item' },
		legend: { top: '5%', left: 'center' },
		series: [
			{
				name: name,
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				padAngle: 5,
				itemStyle: {
					borderRadius: 10
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 18,
						fontFamily: 'Roboto, sans-serif',
						fontWeight: 'bold',
						color: ''
					}
				},
				labelLine: {
					show: false
				},
				data: data
			}
		]
	}

	return (
		<div style={{ width: '100%', height: 300 }}>
			<ReactECharts
				option={option}
				style={{ height: '100%', width: '100%' }}
			/>
		</div>
	)
}

export default PieChart
