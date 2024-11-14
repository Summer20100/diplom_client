import { FC } from 'react'

interface IChairType {
  chair_type: string; 
  price: number
}

interface ILegend {
  chairtype: IChairType[];
}

export const Legend:FC <ILegend> = ({ chairtype }) => {
  return (
      <div className="buying-scheme__legend">
        <div className="col">
          {
            chairtype.map((chair, index) => (
              <p key={index} className="buying-scheme__legend-price">
                <span
                  className={`buying-scheme__chair buying-scheme__chair_${chair.chair_type}`}
                ></span> Свободно (
                <span className="buying-scheme__legend-value">{chair.price}</span> руб.)
              </p>
            ))
          }
        </div>
        <div className="col">
          <p className="buying-scheme__legend-price">
            <span className="buying-scheme__chair buying-scheme__chair_taken">
            </span> Занято</p>
          <p className="buying-scheme__legend-price">
            <span className="buying-scheme__chair buying-scheme__chair_selected">
            </span> Выбрано</p>                    
        </div>
      </div>
  )
}

export default Legend