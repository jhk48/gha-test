import { editUserProfile } from '../editUserProfile';

test('editUserProfile test', async () => {
	const result = await editUserProfile({
		username: 'admin updated',
		bio: 'bio test updated',
		location: 'location test updated'
	});
	expect(result).toStrictEqual({
		username: 'admin updated',
		email: 'admin@example.com',
		bio: 'bio test updated',
		location: 'location test updated'
	});
});
