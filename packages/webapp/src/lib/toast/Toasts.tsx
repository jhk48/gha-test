import * as Style from './styles';
import * as Icon from './icons';
import { MessageType, Message, ToastPosition } from './types';

interface Props {
	position: ToastPosition;
	messages: Message[];
	closeMessage: (id: string, position: ToastPosition) => void;
}

export default function Toasts({ position, messages, closeMessage }: Props) {
	function getIcon(type: MessageType) {
		if (type === 'success') return <Icon.Success />;
		if (type === 'warning') return <Icon.Warning />;
		if (type === 'error') return <Icon.Error />;
		return <Icon.Info />;
	}

	return (
		<Style.ToastContainer position={position}>
			{messages.map(({ id, message, type, duration }) => (
				<Style.Toast key={id} messageType={type} duration={duration}>
					{getIcon(type)}
					<Style.Message messageType={type}>{message}</Style.Message>
					<Style.CloseButton
						type="button"
						messageType={type}
						onClick={() => closeMessage(id, position)}
					>
						<Icon.Close />
					</Style.CloseButton>
					<Style.ProgressBar messageType={type} duration={duration} />
				</Style.Toast>
			))}
		</Style.ToastContainer>
	);
}
