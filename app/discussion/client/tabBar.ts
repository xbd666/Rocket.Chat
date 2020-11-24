import { useMemo, lazy} from 'react';

import { addAction } from '../../../client/channel/lib/Toolbox';
import { useSetting } from '../../../client/contexts/SettingsContext';

addAction('discussions', () => {
	const discussionEnabled = useSetting('Discussion_enabled');

	return useMemo(() => (discussionEnabled ? {
		groups: ['channel', 'group', 'direct'],
		id: 'discussions',
		title: 'Discussions',
		icon: 'discussion',
		template: lazy(() => import('../../../client/channel/Discussions/ContextualBar/List')),
		full: true,
		order: 1,
	} : null), [discussionEnabled]);
});
