import ActionBoard from "./ActionBoard"
import { IActionBoard } from "./ActionBoard"
let boardCount = 0;
export default function ActionBoards({ boards }:{
    boards:IActionBoard[]
}){
    return <>{boards.map((board, index)=><ActionBoard
        key={`abs-${index}`}
        header={board.header}
        data={board.data}
        actionList={board.actionList}
    />)}</>
}