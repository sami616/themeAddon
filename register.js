import * as React from 'react'
import addons from '@storybook/addons'
import { Themes } from './Themes'

addons.register('storybook/themes', api => {
	addons.addPanel('storybook/themes/panel', {
		title: 'Themes',
		render: ({ active }) => {
			return <Themes key="storybook-theme-addon" channel={addons.getChannel()} api={api} active={active} />
		}
	})
})
