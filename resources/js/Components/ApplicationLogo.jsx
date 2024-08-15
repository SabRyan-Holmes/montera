import logo from '@/../../resources/assets/image/logo.png'
export default function ApplicationLogo({className = '', ...props}) {
    return (
        <img src={logo}
        { ...props}
        className={
            className + 'w-28 h-28'
        }
        />
    );
}


