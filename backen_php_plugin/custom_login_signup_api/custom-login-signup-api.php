<?php
/*
Plugin Name: Custom Login and Signup API
Description: Custom REST API endpoints for user login and signup
Version: 1.0
Author: Pardarshee
*/

class custom_login_signup_api {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('custom-auth/v1', '/login', array(
            'methods' => 'POST',
            'callback' => array($this, 'custom_login_callback'),
        ));

        register_rest_route('custom-auth/v1', '/signup', array(
            'methods' => 'POST',
            'callback' => array($this, 'custom_signup_callback'),
        ));
    }

    public function custom_login_callback($request) {
        global $wpdb;
    
        $parameters = $request->get_params();
    
        $username = sanitize_text_field($parameters['username']);
        $password = sanitize_text_field($parameters['password']);
    
        // Check if username or email exists
        $user = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $wpdb->users WHERE user_login = %s OR user_email = %s",
                $username,
                $username
            )
        );
    
        if ($user) {
            // Verify password
            if (wp_check_password($password, $user->user_pass, $user->ID)) {
                // Generate token
                $token = bin2hex(random_bytes(32)); // Generate a random token
                update_user_meta($user->ID, 'custom_auth_token', $token); // Save token to user meta
    
                // Login successful
                wp_set_current_user($user->ID);
                wp_set_auth_cookie($user->ID);
    
                // Set the token in the response
                $response = array(
                    'success' => true,
                    'user_id' => $user->ID,
                    'username' => $user->user_login,
                    'token' => $token,
                    'message' => 'Login successful',
                );
    
                // Set cookie with the token 
                setcookie('custom_auth_token', $token, time() + (30 * 24 * 60 * 60), '/', '', false, true); // Cookie expires in 30 days
    
                return $response;
            }
        }
    
        return array(
            'success' => false,
            'message' => 'Invalid username or password',
        );
    }
    

    public function custom_signup_callback($request) {
        global $wpdb;

        $parameters = $request->get_params();

        $username = $parameters['username'];
        $email = $parameters['email'];
        $password = $parameters['password'];

        // Check if username or email already exists
        $existing_user = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT ID FROM $wpdb->users WHERE user_login = %s OR user_email = %s",
                $username,
                $email
            )
        );

        if ($existing_user) {
            return array(
                'success' => false,
                'message' => 'Username or email already exists',
            );
        }

        // Create new user
        $user_data = array(
            'user_login' => $username,
            'user_email' => $email,
            'user_pass' => wp_hash_password($password),
        );

        $user_id = wp_insert_user($user_data);

        if (!is_wp_error($user_id)) {
            return array(
                'success' => true,
                'user_id' => $user_id,
                'username' => $username,
                'message' => 'Signup successful',
            );
        } else {
            return array(
                'success' => false,
                'message' => 'Failed to create user',
            );
        }
    }
}

// Instantiate the class
$custom_login_signup_api = new custom_login_signup_api();