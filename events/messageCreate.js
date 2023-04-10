const { Events } = require('discord.js')
const supabaseClient = require('./../supabase/supabaseClient')

module.exports = {
  name: Events.MessageCreate,
  async execute (message) {
    console.log(message)
    const messageCreated = {
      message_id: message.id,
      message_content: message.content,
      author_user_id: message.author.id,
      author_username: message.author.username,
      channel_id: message.channelId,
      guild_id: message.guildId
    }

    const { error } = await supabaseClient
      .from('discord_messages')
      .insert(messageCreated)

    if (error) {
      console.log(error)
      return
    }

    console.log('Message ' + messageCreated.message_id + ' created')
  }
}
