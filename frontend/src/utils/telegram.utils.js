/**
 * Function to get a link to the test
 * @returns {string} - link to the test
 */
export function get_link(test_id){
    return "https://t.me/friendship_testing_bot/app?startapp=testid_" + test_id
}

/**
 * Function to copy a link to a test
 */
export async function copy_link(test_id){
    await navigator.clipboard.writeText(get_link(test_id))
    window.Telegram.WebApp.showAlert("The link is copied!")
}

/**
 * Function to share a link to a test
 */
export function share_link(test_id){
    const sharing_url = "https://t.me/share/url?url=" + get_link(test_id)
    window.Telegram.WebApp.openTelegramLink(sharing_url)
}


/**
 * Function to get a user's name in Telegram
 * @returns {string} - user's first name
 */
export function get_name(){
    const initData = new URLSearchParams(window.Telegram.WebApp.initData);
    const parsedData = JSON.parse(initData.get('user'))
    return parsedData['first_name'] + " " + parsedData["last_name"];
}


/**
 * Function to show a popup with an error that has occured
 */
export function show_error_popup(message){
    window.Telegram.WebApp.showPopup({title: "Something went wrong", message: message,
        buttons: [{type : 'close', id: 'error'}]})
}
