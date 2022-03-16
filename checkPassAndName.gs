function checkPassAndName(managementSheet) {
  //.push()でエラーログを格納
  var logList = [];
  //メインプログラム実行可否判定エラーがあればFalseに変更
  var check = true;

  //変換対象追加フォルダの判定
  try {
    //管理表のデータを配列にして格納
    var checkfolderID = managementSheet.getRange(2,1).getValues();
    // Excelファイルが入っているフォルダをidによって取得
    var sourceFolder = DriveApp.getFolderById(checkfolderID);
  } catch (e) {
    check = false;
    logList.push("\\n変換元フォルダを確認してください");
    Logger.log(logList);
  }
   //変換後排出先フォルダの判定
  try {
    //管理表のデータを配列にして格納
    var destFolderID = managementSheet.getRange(2,2).getValues();
    // Excelファイルが入っているフォルダをidによって取得
    var destFolder = DriveApp.getFolderById(destFolderID);
  } catch (e) {
    check = false;
    logList.push("\\n変換先フォルダを確認してください");
    Logger.log(logList);
  }

  //シートを開いて判定
  //スプレットシートIDの確認
  try {
    //管理表のデータを配列にして格納
    var checkPass = managementSheet.getRange(4, 1, 1, 2).getValues();
    var sheetID = checkPass[0][0];
    var openAdditionSS = SpreadsheetApp.openById(sheetID);
    //シート名の確認
    var sheetName = checkPass[0][1];
    var openAdditionSheet = openAdditionSS.getSheetByName(sheetName);
    //シート名が合致するか判定処理
    if (openAdditionSheet == null) {
      logList.push("\\nシート名を確認してください");
      Logger.log(logList);
      check = false;
    }
    //スプレットシートIDで開けなければエラーになるためcatchで拾う
  } catch (e) {
    logList.push("\\nスプレットシートIDを確認してください");
    Logger.log(logList);
    check = false;
  }

  //tureであればエラーメッセージを表示しないfalseであれば表示
  if (check) {
  } else {
    Browser.msgBox(logList);
  }

  return [check, sourceFolder,destFolder, openAdditionSheet];
}