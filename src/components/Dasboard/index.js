import { Component } from 'react'
import './index.css'
import Statistics from '../statistics';
import PieCharts from '../Piechart';
import Barchart from '../Barchart';
import { ImSearch } from 'react-icons/im'
import { Rings } from 'react-loader-spinner'


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

class Dashboard extends Component {
    state = { showloaderpie:true, showloaderBar:true, showLoader: true, showLoaderForStat:true, month: 3, list: [], searchInput: '', statisticsMonth: 3, statisticsData: {}, pieMonth: 3, pieData: {}, barMonth: 3, barData: {} }

    componentDidMount() {
        this.fetchList()
        this.fetchStatistics()
        this.fetchPie()
        this.fetchBar()
    }

    fetchList = async () => {
        this.setState({showLoader:true})
        const { month, searchInput } = this.state
        const data = await fetch(`https://transactions1-765f5733bd55.herokuapp.com/transactions/list?month=${month}&page=1&searchInput=${searchInput}`)
        const jsonData = await data.json()
        console.log(jsonData);
        this.setState({ list: jsonData.data , showLoader:false })
    }

    fetchStatistics = async () => {
        this.setState({showLoaderForStat:true})
        const { statisticsMonth } = this.state
        const data = await fetch(`https://transactions1-765f5733bd55.herokuapp.com/transactions/statistics?month=${statisticsMonth}`)
        const jsonData = await data.json()
        this.setState({ statisticsData: jsonData.data ,showLoaderForStat:false })
    }

    fetchPie = async () => {
        this.setState({showloaderpie:true})
        const { pieMonth } = this.state
        const data = await fetch(`https://transactions1-765f5733bd55.herokuapp.com/transactions/piechart?month=${pieMonth}`)
        const jsonData = await data.json()
        this.setState({ pieData: jsonData.data,showloaderpie:false })
    }

    fetchBar = async () => {
        this.setState({showloaderBar:true})
        const { barMonth } = this.state
        const data = await fetch(`https://transactions1-765f5733bd55.herokuapp.com/transactions/barchart?month=${barMonth}`)
        const jsonData = await data.json()
        this.setState({ barData: jsonData.data , showloaderBar:false })
    }



    updateMonth = (e) => {
        this.setState({ month: e.target.value }, this.fetchList);
    };

    updateSerach = (e) => {
        this.setState({ searchInput: e.target.value }, this.fetchList);
    };

    updatestatisticsMonth = (statMonth) => {
        this.setState({ statisticsMonth: statMonth }, this.fetchStatistics);
    };

    updatePieMonth = (pieMonth) => {
        this.setState({ pieMonth: pieMonth }, this.fetchPie);
    };

    updateBarMonth = (barMonth) => {
        this.setState({ barMonth: barMonth }, this.fetchBar);
    };


    render() {
        const { showloaderpie, showloaderBar, showLoaderForStat, showLoader, list, searchInput, statisticsData, statisticsMonth, pieMonth, pieData, barMonth, barData } = this.state
        return (
            <div className='main-cont'>
                <h1 className='head'>Transactions Dashboard</h1>

                <div className='chartsCont'>
                    <Statistics loader={showLoaderForStat} PassedFunction={this.updatestatisticsMonth} data={statisticsData} month={statisticsMonth} />
                    <Barchart loader={showloaderBar} PassedFunction={this.updateBarMonth} barData={barData} month={barMonth} />
                    <PieCharts loader={showloaderpie} PassedFunction={this.updatePieMonth} piedata={pieData} month={pieMonth} />
                </div>

                <div className='table-cont'>

                    {
                        showLoader ?
                            (
                                
                            <Rings
                                height="80"
                                width="80"
                                color="pink"
                                radius="6"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="rings-loading"
                                
                            />
                            ) :
                            (
                                <div>

                                    <div className='inp-cont'>
                                        <div className='search-bar'>
                                            <input type='search' className='search-element' onChange={this.updateSerach} value={searchInput} placeholder='search by title or description or price' />
                                            <ImSearch />
                                        </div>

                                        <h2 className='table-head'>Transactions Table</h2>

                                        <select className='drop-down' onChange={this.updateMonth} value={this.state.month}>
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>

                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Category</th>
                                                <th>price</th>
                                                <th>Image</th>
                                                <th>Sold</th>
                                                <th>Date Of Slod</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                list.map(row => (
                                                    <tr key={row.id}>
                                                        <td>{row.id}</td>
                                                        <td>{row.title}</td>
                                                        <td>{row.description}</td>
                                                        <td>{row.category}</td>
                                                        <td>{row.price}</td>
                                                        <td>
                                                            <img className='product-image' src={row.image} alt={row.title} />
                                                        </td>
                                                        <td>
                                                            {
                                                                row.sold ? 'Yes' : 'No'
                                                            }

                                                        </td>
                                                        <td>{formatDate(row.dateOfSale)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )

                    }
                </div>


            </div>
        )
    }
}

export default Dashboard