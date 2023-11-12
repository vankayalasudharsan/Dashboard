import './index.css'

const Statistics = props => {
    const { data,month,PassedFunction } = props
    const { totalNotSoldItems,totalSaleAmount,totalSoldItems} = data

    const UpdateState = (e)=>{
        PassedFunction(e.target.value)
    }

    return (
        <div className="stat-cont">
            <div className='stat-top-cont'>
            <h3>Statistics</h3>
            <select className='drop-down2' onChange={UpdateState} value={month}>
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
            <div>
                <p>Total Sale Amount - {totalSaleAmount}</p>
                <p>Total Sold Items - {totalSoldItems}</p>
                <p>Total Not Sold Items - {totalNotSoldItems}</p>
            </div>


        </div>
    )

}

export default Statistics