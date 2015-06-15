<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Base implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'email', 'password'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password', 'remember_token'];

	/**
	 * 用户角色
	 */
	const ROLE_PENDING  = 'pending';
	const ROLE_ADMIN    = 'admin';
	const ROLE_MEMBER   = 'member';
	const ROLE_REJECTED = 'pending';

	public static $arrRole = array(
		self::ROLE_PENDING  => '未认证',
		self::ROLE_ADMIN    => '管理员',
		self::ROLE_MEMBER   => '已认证',
		self::ROLE_REJECTED => '已拒绝',
	);

	public static $arrSex = array(
		'notknow' => '未知',
		'male'    => '女',
		'female'  => '男',
 	);

	
	public static function checkPhoneRepeat($phone_nu){
		$intCount = User::where(array('phone_nu'=>$phone_nu)) -> count();
		return $intCount;
	}

	/**
	 * 用户验证通过
	 */
	public static function passUserVerify($uid, $phone_nu){
		$objUser = User::find($uid);
		$objUser->role = User::ROLE_MEMBER;
		$objUser->phone_nu = $phone_nu;
		return $objUser->save();
	}	

	public static function batchGetUser($arrUid){
		return User::whereIn('id', $arrUid) -> get();
	}

	public static function apiAddUser($arrUser){
		$objUser = new User;
		$objUser -> phone_nu = $arrUser['phone_nu'];
		$objUser -> role = self::ROLE_MEMBER;
		$objUser -> created_at = date('Y-m-d H:i:s');
		if(!$objUser -> save()){
			return false;
		}
		return $objUser -> id;
	}

}
