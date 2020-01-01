/* eslint-disable @typescript-eslint/camelcase */

export type EditorConfigString<Options> = Options | undefined;
export type EditorConfigBoolean = boolean | undefined;
export type EditorConfigIndent = number | undefined;

export interface EditorConfigSection {
  charset?: EditorConfigString<'latin1' | 'utf-16be' | 'utf-16le' | 'utf-8' | 'utf-8-bom'>;
  end_of_line?: EditorConfigString<'cr' | 'lf' | 'crlf'>;
  indent_size?: EditorConfigIndent;
  indent_style?: EditorConfigString<'space' | 'tab'>;
  insert_final_newline?: EditorConfigBoolean;
  root?: EditorConfigBoolean;
  tab_width?: EditorConfigIndent;
  trim_trailing_whitespace?: EditorConfigBoolean;
}

export interface EditorConfig {
  [x: string]: EditorConfigSection;
}

export async function getEditorConfig(): Promise<EditorConfig> {
  return {
    '*': {
      charset: 'utf-8',
      indent_size: 2,
      indent_style: 'space',
      insert_final_newline: true,
      trim_trailing_whitespace: true,
    },
  };
}
