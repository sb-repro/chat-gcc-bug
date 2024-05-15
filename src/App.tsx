import {useEffect} from 'react';

import SendbirdChat from '@sendbird/chat';
import {
    GroupChannelFilter,
    GroupChannelModule,
} from '@sendbird/chat/groupChannel';

const userid = 'purplegorilla412';
const appid = '03D8AABD-0494-44C7-817E-36E07AE75763';

const sb = SendbirdChat.init({
    appId: appid,
    localCacheEnabled: true,
    modules: [new GroupChannelModule()],
});
async function run() {
    await sb.connect(userid);

    async function runCollection1() {
        const collection = sb.groupChannel.createGroupChannelCollection({
            filter: new GroupChannelFilter({includeEmpty: true}),
            limit: 20, // 82
        });

        for (let i = 0; i < 5; i++) {
            const channels = await collection.loadMore();
            console.log(
                '[collection1] collection.loadMore() result:',
                channels.length,
            );
            console.log(
                '[collection1] collection.channels.length:',
                collection.channels.length,
            );
            console.log('[collection1] collection.hasMore:', collection.hasMore);
            console.log('\n');
        }
    }

    async function runCollection2() {
        const collection = sb.groupChannel.createGroupChannelCollection({
            filter: new GroupChannelFilter({includeEmpty: true}),
            limit: 80,
        });

        for (let i = 0; i < 2; i++) {
            const channels = await collection.loadMore();
            console.log(
                '[collection2] collection.loadMore() result:',
                channels.length,
            );
            console.log(
                '[collection2] collection.channels.length:',
                collection.channels.length,
            );
            console.log('[collection2] collection.hasMore:', collection.hasMore);
            console.log('\n');
        }
    }

    await runCollection1();
    console.log('\n');
    console.log('\n');
    await runCollection2();
}

export default () => {
    useEffect(() => {
        run();
    }, []);
    return null;
};
