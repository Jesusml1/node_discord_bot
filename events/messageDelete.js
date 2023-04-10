const { Events } = require('discord.js')
const supabaseClient = require('../supabase/supabaseClient')

module.exports = {
  name: Events.MessageDelete,
  async execute (message) {
    const messageDeleted = {
      message_id: message.id,
      message_content: message.content,
      author_user_id: message.author.id,
      author_username: message.author.username,
      channel_id: message.channelId,
      guild_id: message.guildId
    }

    const { error } = await supabaseClient
      .from('discord_messages')
      .delete()
      .eq('message_id', messageDeleted.message_id)

    if (error) {
      console.error(error)
      return
    }

    console.log('Message ' + messageDeleted.message_id + ' deleted')
  }
}
