import WidgetsIcon from '@mui/icons-material/Widgets';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';

interface Route {
    path: string,
    content: string,
    icon:React.ReactElement
}

const routes: Route[]= [
    { path :"/drawer", content :"Asosiy" , icon :<WidgetsIcon/>},
    { path:"/drawer/order", content :"Orders" , icon :<InboxIcon/>},
    { path:"/drawer/servise", content :"Servise" , icon :<DryCleaningIcon/>}
]

export default routes