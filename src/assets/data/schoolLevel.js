/**
 * @description 主页数据
 */

export default {
    countP:'500',//全校人数
    totalCount:'460',//总分平均分
    hightCount:'31',//高出全地区平均分
    ranking:'6',//地区排名
    goodsuject:['语文','数学'],//表现较好的学科名
    hightavarge:['17','22'],//高于地区平均分
    allNumber:['5','6'],//列全县多少名
    lowSuject:['化学','生物'],//较弱学科名
    lowavarge:['3'],//低于地区平均分
    allRanking:['18'],//列于全区多少名
    tableData1:[
    	{
	  		subject:'总分',
	  		countPeople:'500',
	  		fullMark:'750',
	  		average:'430',
        averages:'380',
        deviation:'50',
        ranking:'6',
        highest:'630',
        highRate:'280',
        excellent:'10%',
        inCommission:'20%',
        yield:'35%',
        failure:'10%'
  		},
  		{
	  		subject:'语文',
        countPeople:'500',
        fullMark:'750',
        average:'430',
        averages:'380',
        deviation:'50',
        ranking:'6',
        highest:'630',
        highRate:'280',
        excellent:'10%',
        inCommission:'20%',
        yield:'35%',
        failure:'10%'
  		},
  		{
	  		subject:'数学',
        countPeople:'500',
        fullMark:'750',
        average:'430',
        averages:'380',
        deviation:'50',
        ranking:'6',
        highest:'630',
        highRate:'280',
        excellent:'10%',
        inCommission:'20%',
        yield:'35%',
        failure:'10%'
  		},
  		{
	  		subject:'英语',
        countPeople:'500',
        fullMark:'750',
        average:'430',
        averages:'380',
        deviation:'50',
        ranking:'6',
        highest:'630',
        highRate:'280',
        excellent:'10%',
        inCommission:'20%',
        yield:'35%',
        failure:'10%'
  		},
  		{
	  		subject:'物理',
        countPeople:'500',
        fullMark:'750',
        average:'430',
        averages:'380',
        deviation:'50',
        ranking:'6',
        highest:'630',
        highRate:'280',
        excellent:'10%',
        inCommission:'20%',
        yield:'35%',
        failure:'10%'
  		}
    ],
    option1:{tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    legend: {
        data:['班级','全校','全区县']
    },
    xAxis: [
        {
            type: 'category',
            data: ['高分率','优秀率','良好率','合格率','不及格率'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '平均分/分',
            max:'150'
        }
    ],
    series: [
        {
            name:'班级',
            type:'bar',
            itemStyle:{
                normal:{
                    color:'#70CDF3'
                }
            },
            label:{
                normal:{
                    show:true,
                    position:'top',
                    color:'#70CDF3'
                }
            },
            barWidth : 60,
            data:[97.8, 77.24, 87.1, 27.78, 37.6]
        },
        {
            name:'全校',
            type:'line',
            itemStyle:{
                normal:{
                    color:'#FFD244'
                }
            },
            label:{
                normal:{
                    show:true,
                    position:'top',
                    color:'#FFD244'
                }
            },
            data:[98.8, 83.24, 91.1, 37.78, 42.6]
        }
    ]}
        
}