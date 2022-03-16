//管理シート指定
var managementSS = SpreadsheetApp.openById('管理するシートID');
var managementSheet = managementSS.getSheetByName('実行シート名');
var rogSheet = managementSS.getSheetByName('実行ログ名');

function main() {
  var result = Browser.msgBox("実行しますか？", Browser.Buttons.OK_CANCEL);//sheetからの使用の場合こちらを有効に
  // var result = "ok";//デバッグ用ボタン回避//HTMLから起動するライブラリ使用コード
  if (result == "ok") {
    //管理シート記載のシートID、シート名が適切か判定するメソッド呼び出し;
    //戻り値:check=TUREorFALSE,
    //sourceFolder=エクセルファイルを入れるフォルダ指定,
    //openAdditionSheet=入れ替え対象スプレットシートのシート情報(配列)
    var [check, sourceFolder, destFolder, openAdditionSheet] = checkPassAndName(managementSheet);
    //Logger.log(check); Logger.log(sourceFolder); Logger.log(openAdditionSheet);//デバック用
    if (check) {

      // csvファイルが入っているフォルダをidによって取得
      const csvFiles = sourceFolder.getFiles();
      Logger.log(csvFiles);
      // const destFolder = DriveApp.getFolderById(destFolderId);

      //ファイルをあるだけ読み込む 
      while (csvFiles.hasNext()) {
        var file = csvFiles.next();
        var makeUrl = convertToSpreadsheet(file, destFolder);
        //管理シートにURLと変換した日時を追加するメソッド呼び出し
        setUrlDate(makeUrl, rogSheet);
        totalDataMake(makeUrl, openAdditionSheet);
      }
      //集計データシートに追加、ソート、重複削除メソッド呼び出し
      //変換後削除するメソッド呼び出し
      delCsvFile(sourceFolder);
    }
  }
  //HTMLから起動するライブラリ使用コード
  //return check;
}