import ReactECharts from 'echarts-for-react'

const BarChart = ({ data }) => {
	const option = {
		title: {
			text: 'Абитуриенты по специальностям',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'shadow' }
		},
		xAxis: {
			type: 'category',
			data: data.map(d => d.name),
			axisLabel: {
				rotate: 0,
				interval: 0
			}
		},
		yAxis: {
			type: 'value',
			name: '',
			minInterval: 1
		},
		series: [
			{
				name: 'Абитуриенты',
				type: 'bar',
				data: data.map(d => d.value),
				itemStyle: {
					color: '#5470C6'
				},
				barWidth: '40%'
			}
		]
	}

	return (
		<div style={{ width: '100%', height: 400 }}>
			<ReactECharts
				option={option}
				style={{ height: '100%', width: '100%' }}
			/>
		</div>
	)
}

export default BarChart
