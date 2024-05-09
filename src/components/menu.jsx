import Category from "./Category"
import { data } from "./data_text"

export default function Menu () {
    return (
        <div className="menu">
            <Category title={data[0].info}/>
            <Category title={data[1].info}/>
            <Category title={data[2].info}/>
            <Category title={data[3].info}/>
            <Category title={data[4].info}/>
        </div>
    )
}
