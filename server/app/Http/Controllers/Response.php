<?php

namespace App\Http\Controllers;

class Response {
  public static function success($message = null) {
    return response()->json([
      'message' => $message
    ], 200);
  }

  public static function successWithData($message = null, $data = null) {
    return response()->json([
      'message' => $message,
      'data' => $data,
    ], 200);
  }

  public static function error($message = null, $code = 400) {
    return response()->json([
      'message' => $message
    ], $code);
  }

  public static function errorWithData($message = null, $data = null, $code = 400) {
    return response()->json([
      'message' => $message,
      'data' => $data,
    ], $code);
  }
}