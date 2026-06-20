package com.navigation

import android.annotation.SuppressLint
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ToastModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ToastModule"
    }

    @SuppressLint("InflateParams")
    @ReactMethod
    fun showToast(message: String,duration:Int) {
        val toastDuration = if (duration == 0) Toast.LENGTH_SHORT else Toast.LENGTH_LONG

        // Inflate the custom layout
        val inflater = LayoutInflater.from(reactApplicationContext)
        val layout: View = inflater.inflate(R.layout.custom_toast, null)

        // Find the TextView and set the text
        val textView: TextView = layout.findViewById(R.id.toast_text)
        textView.text = message

        // Find the ImageView for the close button
        val closeButton: ImageView = layout.findViewById(R.id.toast_close)
        closeButton.setOnClickListener {
            // You can handle the close button click here
            Toast.makeText(reactApplicationContext, "Toast closed", Toast.LENGTH_SHORT).show()
        }

        // Create and show the Toast with the custom layout
        val toast = Toast(reactApplicationContext)
        toast.duration = toastDuration
        toast.view = layout
        toast.setGravity(Gravity.CENTER, 0, 0) // Center the Toast
        toast.show()
    }
}