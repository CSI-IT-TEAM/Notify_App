import { Avatar } from 'react-native-paper';

export default function AvatarBox({ size, thumb, type = '' }){
    if(type === 'static'){
        return (
            <Avatar.Image size={size} source={require('../../../assets/images/avatars/avatar-1.png')} />
        )
    }
    else{
        return (
            <Avatar.Image size={size} source={{ uri: thumb }} />
        )
    }
}