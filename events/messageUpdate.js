const { Events } = require('discord.js')
const supabaseClient = require('./../supabase/supabaseClient')

module.exports = {
  name: Events.MessageUpdate,
  async execute (message) {
    const messageUpdated = {
      message_id: message.id,
      message_content: message.reactions.message.content,
      author_user_id: message.author.id,
      author_username: message.author.username,
      channel_id: message.channelId,
      guild_id: message.guildId
    }

    const { error } = await supabaseClient
      .from('discord_messages')
      .update({ message_content: messageUpdated.message_content })
      .eq('message_id', messageUpdated.message_id)

    if (error) {
      console.error(error)
      return
    }

    console.log('Message ' + messageUpdated.message_id + ' updated')
  }
}
